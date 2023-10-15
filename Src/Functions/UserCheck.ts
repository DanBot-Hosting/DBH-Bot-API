import { DiscordAPIToken } from "../Config.json";
import Undici from "undici";

export default async function UserCheck(ID: string): Promise<number> {
  const Data: any = await Undici.fetch("https://discord.com/api/users/" + ID, {
    headers: {
      Authorization: "Bot " + DiscordAPIToken,
    },
  }).then((Response) => Response.json());
  if (Data.code !== null && Data.code === 10013) return 0;
  if (Data.bot) return 2;
  return 1;
}
