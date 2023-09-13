# DanBot Hosting Bots API

Welcome to the official DanBot Hosting Bots API!

This is the server-side project that allows users to add their own bot into our [Community Server](https://discord.gg/dbh)!

> ⚠️ This project is still in a testing stage. It should be good enough for production, but bugs may occur.

> 🚨 Found a bug? Open a [GitHub Issue](https://github.com/DanBot-Hosting/DBH-BOT-API/issues/new). Found a vulnerability? Open a ticket in our [Discord Server](https://discord.gg/dbh) (Soon enough on a support website!)

# API

**AddAPIKey**

Creates a new API key. This endpoint requires an admin API key!

- **URL**

/apikey

- **Method:**

`POST`

- **URL Params**

**Required:**

`discordid=[string]`

`key=[string]`

- **Success Response:**

- **Code:** 201 <br  />

**Content:** `{ result: [Your API Key] }`

- **Error Response:**

- **Code:** 400/403 <br  />

**Content:** `{ error : [The error] }`

---

**AddBot**

Adds a bot to the API.

- **URL**

/addbot

- **Method:**

`POST`

- **URL Params**

**Required:**

`discordid=[string]`

`ownerid=[string]`

`apikey=[string]`

`name=[string]`

`avatar=[string]`

`users=[integer]`

`guilds=[integer]`

`shards=[integer]`

- **Success Response:**

- **Code:** 201 <br  />

**Content:** `{ result: "Success!" }`

- **Error Response:**

- **Code:** 400/403 <br  />

**Content:** `{ error : [The error] }`

---

**Bot**

Gets a bot on the API.

- **URL**

/bot

- **Method:**

`GET`

- **URL Params**

**Required:**

`discordid=[string]`

`userid=[string]`

`apikey=[string]`

- **Success Response:**

- **Code:** 200 <br  />

**Content:** `{ result: [The bot] }`

- **Error Response:**

- **Code:** 400/403 <br  />

**Content:** `{ error : [The error] }`

---

**Bots**

Gets all bots on the API.

- **URL**

/bots

- **Method:**

`GET`

- **URL Params**

**Required:**

`userid=[string]`

`apikey=[string]`

- **Success Response:**

- **Code:** 200 <br  />

**Content:** `{ result: [All the bots] }`

- **Error Response:**

- **Code:** 400/403 <br  />

**Content:** `{ error : [The error] }`

---

**Index**

Just the API's index.

- **URL**

/

- **Method:**

`GET`

- **Success Response:**

- **Code:** 200 <br  />

**Content:** `{ message: "Welcome to DBH's Bot API!" }`
