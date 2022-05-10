const { PostgreSQLQuery } = require("../DBHBotApi");
const RoutePermissions = require("../Functions/RoutePermissions");
const GetKey = require("../Functions/GetKey");
const Crypto = require("crypto");

async function Route(Fastify, Options) {
  Fastify.post("/apikey", async (Request, Reply) => {
    if (!(await RoutePermissions(Request, Reply))) return;
    if (!Request.query.id) return Reply.send("Missing Discord ID!");
    if (await GetKey(Request.query.id))
      return Reply.send("An API Key for this user already exists!");

    const Key = Crypto.randomBytes(10).toString("hex");
    await PostgreSQLQuery(
      "INSERT INTO apikeys (discordid, key) VALUES ($1, $2)",
      [Request.query.id, Key]
    );
    return Reply.send(Key);
  });
}

module.exports = Route;
