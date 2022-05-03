async function Plugin(Fastify) {
  Fastify.register(require("@fastify/formbody"));
}

module.exports = Plugin;
