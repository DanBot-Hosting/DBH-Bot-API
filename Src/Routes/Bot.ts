import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import KeyCheck from "../Functions/KeyCheck";
import Bot from "../Functions/GetBot";

type Request = FastifyRequest<{
  Querystring: {
    key?: string;
    discordid?: string;
    userid?: string;
    apikey?: string;
    ownerid?: string;
    name?: string;
    avatar?: string;
    users?: number;
    guilds?: number;
    shards?: number;
  };
}>;

export default async function Route(Fastify: FastifyInstance) {
  Fastify.get("/bot", async (Request: Request, Reply: FastifyReply) => {
    if (
      !Request.query.discordid ||
      !Request.query.userid ||
      !Request.query.apikey
    )
      return Reply.status(400).send({
        error:
          "You need to provide a 'discordid', 'userid' and 'apikey' parameter!",
      });
    if (!(await KeyCheck(Request.query.userid, Request.query.apikey)))
      return Reply.status(403).send({
        error: "Invalid API key!",
      });
    await Bot(Request.query.discordid).then(async (Data) => {
      if (!Data) return Reply.status(404).send({ error: "Bot not found!" });
      return Reply.status(200).send({ result: Data });
    });
  });
}
