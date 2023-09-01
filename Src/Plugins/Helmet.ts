import { FastifyInstance } from "fastify";

export default async function Plugin(Fastify: FastifyInstance) {
  Fastify.register(require("@fastify/helmet"));
}
