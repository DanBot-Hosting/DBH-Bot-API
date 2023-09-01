import { DiscordAPIToken } from "../Config.json";
import Undici from "undici";

export default async function UserCheck(ID: string) {
  const Data: any = await Undici.fetch("https://discord.com/api/users/" + ID, {
    headers: {
      Authorization: "Bot " + DiscordAPIToken,
    },
  }).then((Response) => Response.json());
  if (Data.message && Data.message === "Unknown User") return false;
  if (Data.bot) return false;
  return true;
}
