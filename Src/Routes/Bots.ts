import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import DBHBotApi from "../DBHBotApi";
import Bot from "../Types/Bot";

export default async function Route(Fastify: FastifyInstance) {
  Fastify.get("/bots", async (Request: FastifyRequest, Reply: FastifyReply) => {
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
