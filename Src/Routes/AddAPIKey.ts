import DBHBotApi from "../DBHBotApi";
import RoutePermissions from "../Functions/RoutePermissions";
import GetKey from "../Functions/GetKey";
import Crypto from "crypto";
import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";

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
  Fastify.post("/apikey", async (Request: Request, Reply: FastifyReply) => {
    if (!(await RoutePermissions(Request, Reply))) return;
    if (!Request.query.discordid)
      return Reply.send({ error: "Missing Discord ID!" });
    if (await GetKey(Request.query.discordid))
      return Reply.send({ error: "An API Key for this user already exists!" });

    const Key = Crypto.randomBytes(10).toString("hex");
    await DBHBotApi.PostgreSQLQuery(
      "INSERT INTO apikeys (discordid, key) VALUES ($1, $2)",
      [Request.query.discordid, Key],
    );
    return Reply.status(201).send({ result: Key });
  });
}
