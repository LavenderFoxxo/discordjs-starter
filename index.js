const { Client, GatewayIntentBits } = require("discord.js");
const fs = require("fs");
require("dotenv").config();
const path = require("path");
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v10");
const log = require("./util/logger");
const client = new Client({
  intents: [
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.Guilds,
  ],
});

// Command and Event Files are loaded through index.js

const eventPath = path.join(__dirname, "/events");
const eventFiles = fs
  .readdirSync("./events")
  .filter((file) => file.endsWith(".js"));

// Binding Stuff

client.commandDir = "./commands/";

// Loading Events and Slash Commands/Registering Commands

const commands = {};
fs.readdirSync(client.commandDir).forEach((dirs) => {
  commands[dirs] = fs
    .readdirSync(`${client.commandDir}${dirs}`)
    .filter((file) => file.endsWith(".js"))
    .map((file) => require(`${client.commandDir}${dirs}/${file}`));
});

// Make it globally accessible

client.commands = commands;

// Back to loading crap

for (file of eventFiles) {
  const filePath = path.join(eventPath, file);
  const event = require(filePath);
  if (event.once) {
    client.once(event.name, (...args) => event.execute(...args, client));
  } else {
    client.on(event.name, (...args) => event.execute(...args, client));
  }
}

// Send commands to Discord

const rest = new REST({ version: "10" }).setToken(process.env.TOKEN);
(async () => {
  try {
    log("Trying to refresh slash commands...", "info")

    await rest.put(Routes.applicationCommands(process.env.BOTID), {
      body: Object.values(commands)
        .flat()
        .map((command) => command.data.toJSON()),
    });

    log("Successfully refreshed slash commands!", "info")
  } catch (err) {
    console.log(err);
  }
})();

// And finally, start the bot

client.login(process.env.TOKEN);
