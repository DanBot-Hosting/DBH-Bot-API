import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";

export default async function Route(Fastify: FastifyInstance) {
  Fastify.get("/", async (Request: FastifyRequest, Reply: FastifyReply) => {
    return Reply.status(200).send({ message: "Welcome to DBH's Bot API!" });
  });
}
