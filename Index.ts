import DBHBotApi from "./Src/DBHBotApi";
import Fastify from "fastify";

const FastifyInstance = Fastify({
  logger: false,
  ignoreTrailingSlash: true,
});

DBHBotApi.StartWebServer(FastifyInstance);
DBHBotApi.PostgreSQLUtils();
