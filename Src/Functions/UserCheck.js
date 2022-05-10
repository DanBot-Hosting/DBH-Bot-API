const { DiscordAPIToken } = require("../Config.json");
const Undici = require("undici");

async function UserCheck(ID) {
  const Data = await Undici.fetch("https://discord.com/api/users/" + ID, {
    headers: {
      Authorization: "Bot " + DiscordAPIToken,
    },
  }).then((Response) => Response.json());
  if (Data.message && Data.message === "Unknown User") return false;
  if (Data.bot) return false;
  return true;
}

module.exports = UserCheck;
