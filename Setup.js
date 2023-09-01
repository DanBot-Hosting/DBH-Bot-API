const { PostgreSQLURL } = require("./Src/Config.json");
const { Client } = require("pg");

if (!PostgreSQLURL) {
  console.log("Configure Src/Config.json before running this!");
  process.exit();
}

(async () => {
  const Postgres = new Client(PostgreSQLURL);
  await Postgres.connect().then(async () => {
    await Postgres.query(
      "CREATE TABLE IF NOT EXISTS bots (ID SERIAL, DiscordID text, OwnerID text, Name text, Avatar text, Users integer, Guilds integer, Shards integer);",
    );
    await Postgres.query(
      "CREATE TABLE IF NOT EXISTS apikeys (ID SERIAL, DiscordID text, Bots text, Key text);",
    );
    process.exit(0);
  });
})();
