async function Route(Fastify, Options) {
  Fastify.get("/", async (Request, Reply) => {
    return await Reply.send("Welcome to DBH's Bot API!");
  });
}

module.exports = Route;
