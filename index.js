//bot config
const Discord = require("discord.js");
const client = new Discord.Client({
  disableEveryone: true,
  autoReconnect: true,
  disabledEvents: ["TYPING_START"],
  partials: ["MESSAGE", "CHANNEL", "GUILD_MEMBER", "REACTION", "USER"],
});

const config = require("./assets/config.json");
const { token } = require("./assets/token.json");
const fs = require("fs");
const { Player } = require("discord-player");
const db = require("quick.db");

client.colors = require("./assets/colors.json");
client.emojis = require("./assets/emojis.json");
client.player = new Player(client);
client.config = require("./assets/config.json");
client.filters = client.config.filters;

//creating the event and command handler
client.commands = new Discord.Collection();

const player = fs
  .readdirSync("./player")
  .filter((file) => file.endsWith(".js"));

for (const file of player) {
  const event = require(`./player/${file}`);
  client.player.on(file.split(".")[0], event.bind(null, client));
}

client.events = new Discord.Collection();
client.cooldowns = new Discord.Collection();

["command_handler", "event_handler"].forEach((handler) => {
  require(`./assets/handlers/${handler}`)(client, Discord);
});

//const dashboard = require("./dashboard/app");
//dashboard(client)

const Constants = require("./node_modules/discord.js/src/util/Constants.js");

if (db.get(`phone`, true)) {
  Constants.DefaultOptions.ws.properties.$browser = `Discord iOS`;
} else {
  Constants.DefaultOptions.ws.properties.$browser = `discord.js`;
}

const staff_apps = require('./staff_app_responses');
staff_apps(client, Discord)

//here add the file paths so it knows where to look for the files

const GiveawaysManager = require("./events/guild/GiveawaysManager");

//here add all events as we need to declare them here to use them

GiveawaysManager(Discord, client);

//logging in to the bot
client.login(token);
