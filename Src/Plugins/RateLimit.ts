import { FastifyInstance } from "fastify";
import Config from "../Config.json";

export default async function Plugin(Fastify: FastifyInstance) {
  Fastify.register(require("@fastify/rate-limit"), {
    max: Config.RateLimit.Max,
    timeWindow: Config.RateLimit.TimeWindow,
  });
}
