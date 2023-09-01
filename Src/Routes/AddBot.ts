import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import DBHBotApi from "../DBHBotApi";
import WhitelistedIPsCheck from "../Functions/WhitelistedIPsCheck";
import UserCheck from "../Functions/UserCheck";
import GetBot from "../Functions/GetBot";

type Request = FastifyRequest<{
  Querystring: {
    key?: string;
    discordid?: string;
    ownerid?: string;
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
      !Request.query.name ||
      !Request.query.avatar ||
      !Request.query.users ||
      !Request.query.guilds ||
      !Request.query.shards
    )
      return Reply.status(400).send({
        error: "You are missing one of the necessary queries to add your bot!",
      });
    if (!(await WhitelistedIPsCheck(Request, Reply)))
      return Reply.status(403).send({
        error:
          "You are trying to add a bot from a non-whitelisted IP: " +
          Request.ip,
      });
    if (await UserCheck(Request.query.discordid))
      return Reply.status(400).send({
        error: "You are trying to add an invalid bot!",
      });
    if (await GetBot(Request.query.discordid))
      return Reply.status(400).send({
        error: "You are trying to add an already existing bot!",
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

    return Reply.status(201).send({ result: "Success!" });
  });
}
