import DBHBotApi from "../DBHBotApi";

export default async function GetKey(ID: string) {
  const Key = await DBHBotApi.PostgreSQLQuery(
    "SELECT * FROM apikeys WHERE discordid = $1",
    [ID],
  );
  if (Key.rowCount === 0) return null;
  return true;
}
