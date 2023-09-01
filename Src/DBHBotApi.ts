import { FastifyInstance } from "fastify";
import Config from "./Config.json";
import { Client } from "pg";
import Fs from "fs";

let Postgres: Client;

export default class DBHBotApi {
  static async StartWebServer(Fastify: FastifyInstance) {
    this.LoadRoutes(Fastify);
    this.LoadPlugins(Fastify);

    Fastify.listen(
      {
        port: Config.Port,
        host: Config.Production ? "0.0.0.0" : "127.0.0.1",
      },
      (error, address) => {
        console.log(
          "DBH's Bot API is now online on " +
            address +
            "! - Coded with love by Dotto :D",
        );
      },
    );
  }

  static async LoadRoutes(Fastify: FastifyInstance) {
    Fs.readdirSync("./Src/Routes").forEach((File) => {
      if (File.endsWith(".js") || File.endsWith(".ts")) {
        if (File.endsWith(".ts")) File = File.replace(".ts", ".js");
        const Route = require("./Routes/" + File);
        console.log("Registering route: " + File);
        Fastify.register(Route);
      }
    });
  }

  static async LoadPlugins(Fastify: FastifyInstance) {
    Fs.readdirSync("./Src/Plugins").forEach((File) => {
      if (File.endsWith(".js") || File.endsWith(".ts")) {
        if (File.endsWith(".ts")) File = File.replace(".ts", ".js");
        const Plugin = require("./Plugins/" + File);
        console.log("Registering plugin: " + File);
        Plugin.default(Fastify);
      }
    });
  }

  static async PostgreSQLUtils() {
    Postgres = new Client(Config.PostgreSQLURL);
    await Postgres.connect().then(() => {
      console.log("Connected to PostgreSQL!");
    });
  }

  static async PostgreSQLQuery(Query: string, Values?: any[]) {
    return await Postgres.query(Query, Values);
  }
}
