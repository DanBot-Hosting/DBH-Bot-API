import { FastifyRequest, FastifyReply } from "fastify";
import { ServerKey } from "../Config.json";

type Request = FastifyRequest<{
  Querystring: { key?: string };
}>;

export default async function RoutePermissions(
  Request: Request,
  Reply: FastifyReply,
) {
  if (!Request.query.key || Request.query.key !== ServerKey) {
    Reply.send({ error: "You are not authorized to see this!" });
    return false;
  }

  return true;
}
