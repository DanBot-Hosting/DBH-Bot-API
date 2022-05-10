const { ServerKey } = require("../Config.json");

async function RoutePermissions(Request, Reply) {
  if (!Request.query.key || Request.query.key !== ServerKey) {
    Reply.send("You are not authorized to see this!");
    return false;
  }

  return true;
}

module.exports = RoutePermissions;
