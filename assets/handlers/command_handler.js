const fs = require("fs");
const chalk = require("chalk");
module.exports = async (client, Discord) => {
  const { Collection } = require("discord.js");
  client.commands = new Collection();

  //We let the bot read through the 'commands' folder and return an array including all category folders
  const categories = fs.readdirSync("./commands");

  for (const category of categories) {
    const commandFiles = fs
      .readdirSync(`./commands/${category}`)
      .filter((File) => File.endsWith(".js"));
    //We now enter every sub-folder one by one and filter the files to include .js only, readdirSync() returns an array including the items/files in that directory

    //We create an intended for loop (notice how the for loops are inside eachother)
    for (const file of commandFiles) {
      const command = require(`../../commands/${category}/${file}`);
      //We grab that command-file and it's values, and we push it into the commands collection
      client.commands.set(command.name, command);
    }
  }
};
