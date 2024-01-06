import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import KeyCheck from "../Functions/KeyCheck";
import DBHBotApi from "../DBHBotApi";
import Bot from "../Types/Bot";

type Request = FastifyRequest<{
  Querystring: {
    key?: string;
    discordid?: string;
    userid?: string;
    apikey?: string;
    name?: string;
    avatar?: string;
    users?: number;
    guilds?: number;
    shards?: number;
  };
}>;

export default async function Route(Fastify: FastifyInstance) {
  Fastify.get("/bots", async (Request: Request, Reply: FastifyReply) => {
    if (!Request.query.userid || !Request.query.apikey)
      return Reply.status(400).send({
        error: "You need to provide a 'userid' and 'apikey' parameter!",
      });
    if (!(await KeyCheck(Request.query.userid, Request.query.apikey)))
      return Reply.status(403).send({
        error: "Invalid API key!",
      });

    const Bots = await DBHBotApi.PostgreSQLQuery("SELECT * FROM bots");
    if (Bots.rowCount === 0)
      return Reply.status(404).send({
        error: "The API currently have no bots, come back later!",
      });

    const BotsArray: Bot[] = [];
    Bots.rows.map((Bot: Bot) => {
      BotsArray.push({
        discordid: Bot.discordid,
        name: Bot.name,
        avatar: Bot.avatar,
        users: Bot.users,
        guilds: Bot.guilds,
        shards: Bot.shards === null ? 0 : Bot.shards,
      });
    });
    return Reply.status(200).send({ result: BotsArray });
  });
}
