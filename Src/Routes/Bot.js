const Bot = require("../Functions/GetBot");

async function Route(Fastify, Options) {
  Fastify.get("/bot", async (Request, Reply) => {
    if (!Request.query.id) return Reply.send("You need to provide an ID!");
    await Bot(Request.query.id).then(async (Data) => {
      if (!Data) return Reply.send("Bot not found!");
      return Reply.send(Data);
    });
  });
}

module.exports = Route;
