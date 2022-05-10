const { PostgreSQLQuery } = require("../DBHBotApi");
const WhitelistedIPsCheck = require("../Functions/WhitelistedIPsCheck");
const UserCheck = require("../Functions/UserCheck");
const GetBot = require("../Functions/GetBot");
const Crypto = require("crypto");

async function Route(Fastify, Options) {
  Fastify.get("/addbot", async (Request, Reply) => {
    if (
      !Request.query.id ||
      !Request.query.ownerid ||
      !Request.query.name ||
      !Request.query.avatar ||
      !Request.query.users ||
      !Request.query.guilds ||
      !Request.query.shards
    )
      return Reply.send(
        "You are missing one of the necessary queries to add your bot!"
      );
    if (!(await WhitelistedIPsCheck(Request, Reply)))
      return Reply.send(
        "You are trying to add a bot from a non-whitelisted IP: " + Request.ip
      );
    if (!(await UserCheck(Request.query.id)))
      return Reply.send("You are trying to add an invalid bot!");
    if (await GetBot(Request.query.id))
      return Reply.send("You are trying to add an already existing bot!");

    await PostgreSQLQuery(
      "INSERT INTO bots (discordid, ownerid, name, avatar, users, guilds, shards) VALUES ($1, $2, $3, $4, $5, $6, $7)",
      [
        Request.query.id,
        Request.query.ownerid,
        Request.query.name,
        Request.query.avatar,
        Request.query.users,
        Request.query.guilds,
        Request.query.shards,
      ]
    );
  });
}

module.exports = Route;
