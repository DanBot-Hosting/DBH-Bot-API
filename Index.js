const PG = require("pg");
const Fastify = require("fastify")({
  logger: false,
  ignoreTrailingSlash: true,
});

const {
  LoadPlugins,
  LoadRoutes,
  StartWebServer,
  PostgreSQLUtils,
} = require("./Src/DBHBotApi");
LoadPlugins(Fastify);
LoadRoutes(Fastify);
StartWebServer(Fastify);
PostgreSQLUtils(PG);
