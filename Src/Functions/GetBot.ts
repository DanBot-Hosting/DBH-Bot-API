import DBHBotApi from "../DBHBotApi";

export default async function GetBot(ID: string) {
  const Bot = await DBHBotApi.PostgreSQLQuery(
    "SELECT * FROM bots WHERE discordid = $1",
    [ID],
  );
  if (Bot.rowCount === 0) return null;
  const Data = {
    discordid: Bot.rows[0].discordid,
    name: Bot.rows[0].name,
    avatar: Bot.rows[0].avatar,
    users: Bot.rows[0].users,
    guilds: Bot.rows[0].guilds,
    shards: Bot.rows[0].shards === null ? 0 : Bot.rows[0].shards,
  };
  return Data;
}
