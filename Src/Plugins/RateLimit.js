const Config = require("../Config.json");

async function Plugin(Fastify) {
  Fastify.register(require("@fastify/rate-limit"), {
    max: Config.RateLimit.Max,
    timeWindow: Config.RateLimit.TimeWindow,
  });
}

module.exports = Plugin;
