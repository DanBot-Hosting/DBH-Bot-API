import DBHBotApi from "../DBHBotApi";
import BCrypt from "bcrypt";

export default async function KeyCheck(ID: string, Key: string) {
  const APIKey = await DBHBotApi.PostgreSQLQuery(
    "SELECT * FROM apikeys WHERE discordid = $1",
    [ID],
  );
  if (APIKey.rowCount === 0) return false;
  console.log(APIKey.rows, ID, Key);
  const Hash = APIKey.rows[0].key;

  console.log(await BCrypt.compare(Key, Hash));

  if (!(await BCrypt.compare(Key, Hash))) return false;
  return true;
}
