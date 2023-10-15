import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import KeyCheck from "../Functions/KeyCheck";
import DBHBotApi from "../DBHBotApi";
import WhitelistedIPsCheck from "../Functions/WhitelistedIPsCheck";
import UserCheck from "../Functions/UserCheck";
import GetBot from "../Functions/GetBot";
import Bot from "../Types/Bot";
import WebhookCaller from "../Functions/WebhookCaller";

type Request = FastifyRequest<{
  Querystring: {
    key?: string;
    discordid?: string;
    ownerid?: string;
    apikey?: string;
    name?: string;
    avatar?: string;
    users?: number;
    guilds?: number;
    shards?: number;
  };
}>;

export default async function Route(Fastify: FastifyInstance) {
  Fastify.post("/addbot", async (Request: Request, Reply: FastifyReply) => {
    if (
      !Request.query.discordid ||
      !Request.query.ownerid ||
      !Request.query.apikey ||
      !Request.query.name ||
      !Request.query.avatar ||
      !Request.query.users ||
      !Request.query.guilds ||
      !Request.query.shards
    )
      return Reply.status(400).send({
        error: "You are missing one of the necessary queries to add your bot!",
      });
    if (!(await KeyCheck(Request.query.ownerid, Request.query.apikey)))
      return Reply.status(403).send({
        error: "Invalid API key!",
      });
    if (!(await WhitelistedIPsCheck(Request, Reply)))
      return Reply.status(403).send({
        error:
          "You are trying to add a bot from a non-whitelisted IP: " +
          Request.ip,
      });
    if ((await UserCheck(Request.query.discordid)) !== 2)
      return Reply.status(400).send({
        error: "You are trying to add an invalid bot!",
      });
    if ((await GetBot(Request.query.discordid)) !== null)
      return Reply.status(400).send({
        error: "You are trying to add an already existing bot!",
      });
    if (
      !Request.query.avatar.startsWith("https://cdn.discordapp.com/avatars") ||
      Request.query.name.length > 32 ||
      Request.query.guilds > 1000000 ||
      Request.query.users > 10000000 ||
      Request.query.shards > 10000
    )
      return Reply.status(400).send({
        error: "Invalid bot data!",
      });

    await DBHBotApi.PostgreSQLQuery(
      "INSERT INTO bots (discordid, ownerid, name, avatar, users, guilds, shards) VALUES ($1, $2, $3, $4, $5, $6, $7)",
      [
        Request.query.discordid,
        Request.query.ownerid,
        Request.query.name,
        Request.query.avatar,
        Request.query.users,
        Request.query.guilds,
        Request.query.shards,
      ],
    );

    const UserBots: Bot[] = [];
    const Bots = await DBHBotApi.PostgreSQLQuery(
      "SELECT * FROM bots WHERE ownerid = $1",
      [Request.query.ownerid],
    );
    Bots.rows.forEach((Bot: Bot) => {
      if (!Bot.discordid) return;
      UserBots.push(Bot);
    });

    await DBHBotApi.PostgreSQLQuery(
      "UPDATE apikeys SET bots = $1 WHERE discordid = $2",
      [JSON.stringify(UserBots), Request.query.ownerid],
    );

    await WebhookCaller(
      `A new bot was just added to the API!\n• Owner: ${Request.query.ownerid}.\n• Bot ID/name: ${Request.query.discordid}/${Request.query.name}.\n• Bot users/guilds/shards: ${Request.query.users}/${Request.query.guilds}/${Request.query.shards}.\n• Invite: [Click here](https://discord.com/oauth2/authorize?client_id=${Request.query.discordid}&scope=bot&permissions=0).`,
    );

    return Reply.status(201).send({ result: "Success!" });
  });
}
