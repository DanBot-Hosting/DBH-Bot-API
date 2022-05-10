const Config = require("./Config.json");
const Fs = require("fs");

let Postgres;

class Actions {
  static async StartWebServer(Fastify) {
    Fastify.listen(
      Config.Port,
      Config.Production ? "0.0.0.0" : "127.0.0.1",
      (error, address) => {
        console.log(
          "DBH's Bot API is now online on " +
            address +
            "! - Coded with love by Dotto :D"
        );
      }
    );
  }

  static async LoadRoutes(Fastify) {
    Fs.readdirSync("./Src/Routes").forEach((file) => {
      if (file.endsWith(".js")) {
        const Route = require("./Routes/" + file);
        console.log("Registering route: " + file);
        Fastify.register(Route);
      }
    });
  }

  static async LoadPlugins(Fastify) {
    Fs.readdirSync("./Src/Plugins").forEach((file) => {
      if (file.endsWith(".js")) {
        const Plugin = require("./Plugins/" + file);
        console.log("Registering plugin: " + file);
        Plugin(Fastify);
      }
    });
  }

  static async PostgreSQLUtils(PG) {
    Postgres = new PG.Client(Config.PostgreSQLURL);
    await Postgres.connect().then(() => {
      console.log("Connected to PostgreSQL!");
    });
  }

  static async PostgreSQLQuery(Query, Values) {
    return await Postgres.query(Query, Values);
  }
}

module.exports = Actions;
