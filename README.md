# DanBot Hosting Bots API

Welcome to the official DanBot Hosting Bots API!

This is the server-side project that allows users to add their own bot into our [Community Server](https://discord.gg/dbh)!

> [!WARNING]
> This project is still in a testing stage. It should be good enough for production, but bugs may occur.

## Documentation

- [Endpoints](#documentation)
  - [AddAPIKey](#post-addapikey)
  - [RemoveAPIKey](#post-removeapikey)
  - [AddBot](#post-addbot)
  - [GetBot](#get-bot)
  - [GetBots](#get-bots)


---

### `ANY` /

The main index page.

#### Responses

- `200` - Successfully connected to the API.
    - Content-Type: `application/json`
    - Body: `{ message: "Welcome to DBH's Bot API!" }`

---

### `POST` /addapikey

Creates a new API key.

> [!IMPORTANT]
> **All URL params are required.**

#### URL Params

- `discordid` [string] - The bot's Discord ID
- `key` [string] - The admin API key, **only select people have this**.

#### Responses

- `201` - Successfully created a new API key.
    - Content-Type: `application/json`
    - Body: `{ result: [Your API Key] }`

- `400/403` - Bad request. You're missing a URL param or something else went wrong.
    - Content-Type: `application/json`
    - Body: `{ error: [The error] }`

---

### `POST` /removeapikey

Removes an API key. 

> [!CAUTION]
> **All associated data with the API key will be removed. Be careful removing a key.**

> [!IMPORTANT]
> **All URL params are required.**

#### URL Params

- `discordid` [string] - The bot's Discord ID
- `key` [string] - The admin API key, **only select people have this**.

#### Responses

- `201` - Successfully removed the API key.
    - Content-Type: `application/json`
    - Body: `{ result: "Key data deleted!" }`

- `400/403` - Bad request. You're missing a URL param or something else went wrong.
    - Content-Type: `application/json`
    - Body: `{ error: [The error] }`

---

### `POST` /addbot

Adds a bot to the API/database.

> [!IMPORTANT]
> **All URL params are required.**

> [!NOTE]
> **Needs to be sent from a DBH node.**

#### URL Params

- `discordid` [string] - The bot's Discord ID
- `ownerid` [string] - The owner's Discord ID
- `apikey` [string] - The API key you received from running `/generate-bot-api-key`.
- `name` [string] - The bot's name
- `avatar` [string] - The bot's avatar URL
- `users` [integer] - The bot's user count
- `guilds` [integer] - The bot's guild count
- `shards` [integer] - The bot's shard count

#### Responses

- `201` - Successfully added the bot.
    - Content-Type: `application/json`
    - Body: `{ result: "Success!" }`

- `400/403` - Bad request. You're missing a URL param or something else went wrong.
    - Content-Type: `application/json`
    - Body: `{ error: [The error] }`

---

### `GET` /bot

Get a bot's data.

> [!IMPORTANT]
> **All URL params are required.**

#### URL Params

- `discordid` [string] - The bot's Discord ID
- `userid` [string] - The Discord bot's owner's ID
- `apikey` [string] -The API key you received from running `/generate-bot-api-key`.

#### Responses

- `200` - Successfully got the bot's data.
    - Content-Type: `application/json`
    - Body: `{ result: { [The bot's data] } }`

- `400/403` - Bad request. You're missing a URL param or something else went wrong.
    - Content-Type: `application/json`
    - Body: `{ error: [The error] }`

---

### `GET` /bots

Get all bot's data.

> [!IMPORTANT]
> **All URL params are required.**

#### URL Params

- `discordid` [string] - The bot's Discord ID
- `userid` [string] - The Discord bot's owner's ID
- `apikey` [string] - The API key you received from running `/generate-bot-api-key`.

#### Responses

- `200` - Successfully got all bots' data.
    - Content-Type: `application/json`
    - Body: `{ result: { [All bot's data] } }`

- `400/403` - Bad request. You're missing a URL param or something else went wrong.
    - Content-Type: `application/json`
    - Body: `{ error: [The error] }`

---

# DanBot

> [!NOTE]
> Found a bug? Open a [GitHub Issue](https://github.com/DanBot-Hosting/DBH-BOT-API/issues/new). Found a vulnerability? Open a ticket in our [Discord Server](https://discord.gg/dbh) (Soon enough on a support website!)

> Made with ❤️ by [DanBot Hosting](https://danbot.host).
