import RoutePermissions from "../Functions/RoutePermissions";
import UserCheck from "../Functions/UserCheck";
import GetKey from "../Functions/GetKey";
import DBHBotApi from "../DBHBotApi";
import Crypto from "crypto";
import BCrypt from "bcrypt";
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
      return Reply.status(400).send({ error: "Missing Discord ID!" });
    if (await GetKey(Request.query.discordid))
      return Reply.status(400).send({
        error: "An API Key for this user already exists!",
      });
    if ((await UserCheck(Request.query.discordid)) !== 1)
      return Reply.status(403).send({ error: "Unauthorized!" });

    const Key = Crypto.randomBytes(12).toString("hex");
    const Hash = await BCrypt.hash(Key, 10);

    await DBHBotApi.PostgreSQLQuery(
      "INSERT INTO apikeys (discordid, key) VALUES ($1, $2)",
      [Request.query.discordid, Hash],
    );
    return Reply.status(201).send({ result: Key });
  });
}
