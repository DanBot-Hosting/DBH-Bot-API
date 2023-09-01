import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import Bot from "../Functions/GetBot";

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
  Fastify.get("/bot", async (Request: Request, Reply: FastifyReply) => {
    if (!Request.query.discordid)
      return Reply.status(400).send({
        error: "You need to provide a 'discordid' parameter!",
      });
    await Bot(Request.query.discordid).then(async (Data) => {
      if (!Data) return Reply.status(404).send({ error: "Bot not found!" });
      return Reply.status(200).send({ result: Data });
    });
  });
}
