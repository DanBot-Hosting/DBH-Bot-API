const { PostgreSQLQuery } = require("../DBHBotApi");

async function Route(Fastify, Options) {
  Fastify.get("/bots", async (Request, Reply) => {
    const Bots = await PostgreSQLQuery("SELECT * FROM bots");
    if (Bots.rowCount === 0)
      return Reply.send("The API currently have no bots, come back later!");

    const BotsArray = [];
    Bots.rows.map((Bot) => {
      BotsArray.push({
        id: Bot.discordid,
        name: Bot.name,
        avatar: Bot.avatar,
        users: Bot.users,
        guilds: Bot.guilds,
        Shards: Bot.shards === null ? 0 : Bot.Shards,
      });
    });
    return Reply.send(BotsArray);
  });
}

module.exports = Route;
