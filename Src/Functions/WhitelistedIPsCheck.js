const { WhitelistedIPs } = require("../Config.json");

async function WhitelistedIPsCheck(Request, Reply) {
  if (WhitelistedIPs.includes(Request.ip)) return true;
  return false;
}

module.exports = WhitelistedIPsCheck;
