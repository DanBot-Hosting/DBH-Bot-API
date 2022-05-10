const { PostgreSQLQuery } = require("../DBHBotApi");

async function GetKey(ID) {
  const Key = await PostgreSQLQuery(
    "SELECT * FROM apikeys WHERE discordid = $1",
    [ID]
  );
  if (Key.rowCount === 0) return null;
  return true;
}

module.exports = GetKey;
