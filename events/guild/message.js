const moment = require("moment");
const chalk = require("chalk");
const db = require("quick.db");
const { MessageEmbed } = require("discord.js");
const cooldowns = new Map();

module.exports = async (Discord, client, message) => {
  const config = client.config;
  const colors = client.colors;
  let prefix = "!";
  const user = message.author;

  if (!db.get(`prefix`, prefix)) {
    db.set(`prefix`, prefix);
  }
  prefix = db.get(`prefix`, prefix);

  if (message.channel.type == "dm") return;

  const invDelete = require("./invDelete");
  invDelete(Discord, client, message);
  const suggestions = require("./suggestions");
  suggestions(Discord, client, message);

  if (message.author.bot) return;

  if (!db.get(`userdata_${user.id}`)) {
    db.set(`userdata_${user.id}`, {
      levels: {
        xp: 1,
        level: 0,
      },
      economy: {
        pocket: 0,
        bank: 0,
      },
      punsishments: {
        warns: 0,
        warnreasons: [],
        bans: 0,
        mutes: 0,
        kicks: 0
      },
      jobs: {
        occupation: "Unemployed",
        ambulanceLvl: 0,
        doctorLvl: 0,
        engineerLvl: 0,
        firemanLvl: 0,
        fishermanLvl: 0,
        mailmanLvl: 0,
        managerLvl: 0,
        policeLvl: 0,
        programmerLvl: 0,
      },
      battle: {
        battleswon: 0,
        battleslost: 0,
      },
      messages: 1,
      commands: 0,
      giveawayswon: 0,
      sanity: "Normal",
      pets: [],
      items: [],
      properties: [],
      ores: {
        coal: 0,
        metal: 0,
        scrap: 0,
        resin: 0,
        lithium: 0,
        titanium: 0,
        copper: 0,
        tungsten: 0,
      },
      food: {
        meat: 0,
        apple: 0,
        pear: 0,
        eggs: 0,
        fish: 0,
        rice: 0,
        pizza: 0,
        burger: 0,
        kebab: 0,
      },
      gases: {
        hydrogen: 0,
        argon: 0,
        nitrogen: 0,
        methane: 0,
        helium: 0,
        sulfur: 0,
      }
    });
  }

  const level = require("../message_extenders/level");
  level(client, Discord, message, db);

  const aaaaaembed = new MessageEmbed()
    .setColor(colors.purple)
    .setDescription(
      `Hello there ${message.author.username}! My current prefix is \`${prefix}\``
    )
    .setFooter("Made with 💝 by Lingen#2230 in JavaScript");

  if (message.content.startsWith(`<@!${client.user.id}>`))
    return message.channel.send(aaaaaembed);

  db.add(`userdata_${user.id}.messages`, 1);

  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).split(/ +/);
  const cmd = args.shift().toLowerCase();

  const command =
    client.commands.get(cmd) ||
    client.commands.find((a) => a.aliases && a.aliases.includes(cmd));
  if (command) {
    //If cooldowns map doesn't have a command.name key then create one.
    if (!cooldowns.has(command.name)) {
      cooldowns.set(command.name, new Discord.Collection());
    }

    const current_time = Date.now();
    const time_stamps = cooldowns.get(command.name);
    const cooldown_amount = (command.cooldown) * 1000;

    //If time_stamps has a key with the author's id then check the expiration time to send a message to a user.
    if (time_stamps.has(message.author.id)) {
      const expiration_time = time_stamps.get(message.author.id) + cooldown_amount;

      if (current_time < expiration_time) {
        const time_left = (expiration_time - current_time) / 1000;

        return message.channel.send(new Discord.MessageEmbed().setTitle("Command Cooldown").setDescription(`Please wait 15 more minutes before using \`${command.name}\`!`).setColor(client.colors.red));
      }
    }

    //If the author's id is not in time_stamps then add them with the current time.
    time_stamps.set(message.author.id, current_time);
    //Delete the user's id once the cooldown is over.
    setTimeout(() => time_stamps.delete(message.author.id), cooldown_amount);
  }
  if (command) {
    command.run(client, message, args, Discord, db);
    db.add(`userdata_${user.id}.commands`, 1);
  }
};