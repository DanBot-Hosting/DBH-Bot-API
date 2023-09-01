import { FastifyRequest, FastifyReply } from "fastify";
import { WhitelistedIPs } from "../Config.json";

export default async function WhitelistedIPsCheck(
  Request: FastifyRequest,
  Reply: FastifyReply,
) {
  if (WhitelistedIPs.includes(Request.ip)) return true;
  return false;
}
