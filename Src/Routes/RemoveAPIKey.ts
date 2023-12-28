import RoutePermissions from "../Functions/RoutePermissions";
import UserCheck from "../Functions/UserCheck";
import GetKey from "../Functions/GetKey";
import DBHBotApi from "../DBHBotApi";
import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import WebhookCaller from "../Functions/WebhookCaller";

type Request = FastifyRequest<{
  Querystring: {
    key?: string;
    discordid?: string;
  };
}>;

export default async function Route(Fastify: FastifyInstance) {
  Fastify.post("/removeapikey", async (Request: Request, Reply: FastifyReply) => {
      if (!(await RoutePermissions(Request, Reply))) return;
      if (!Request.query.discordid)
        return Reply.status(400).send({ error: "Missing Discord ID!" });
      if (!(await GetKey(Request.query.discordid)))
        return Reply.status(400).send({
          error: "This user has no API key!",
        });
      if ((await UserCheck(Request.query.discordid)) !== 1)
        return Reply.status(403).send({ error: "Unauthorized!" });

      await DBHBotApi.PostgreSQLQuery(
        "DELETE FROM apikeys WHERE discordid = $1;",
        [Request.query.discordid],
      );

      await DBHBotApi.PostgreSQLQuery("DELETE FROM bots WHERE ownerid = $1;", [
        Request.query.discordid,
      ]);

      await WebhookCaller(
        `An API key was just removed!\n• User: ${Request.query.discordid}.`,
      );

      return Reply.status(201).send({ result: "Key data deleted!" });
    },
  );
}
