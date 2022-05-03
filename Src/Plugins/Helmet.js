async function Plugin(Fastify) {
  Fastify.register(require("@fastify/helmet"));
}

module.exports = Plugin;
