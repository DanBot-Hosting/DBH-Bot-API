async function Route(Fastify, Options) {
  Fastify.get("/", async (Request, Reply) => {
    return Reply.send("Welcome to DBH's Bot API!");
  });
}

module.exports = Route;
