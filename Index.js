const Fastify = require("fastify")({
  logger: false,
  ignoreTrailingSlash: true,
});

const { StartWebServer, LoadPlugins, LoadRoutes } = require("./Src/DBHBotApi");
LoadPlugins(Fastify);
LoadRoutes(Fastify);
StartWebServer(Fastify);
