const emojis = require('../assets/emojis.json')
const colors = require('../assets/colors.json')
module.exports = (client, message, query) => {
    const Discord = require('discord.js');
    const embed = new Discord.MessageEmbed()
        .setDescription(`${emojis.fail} - No results found on YouTube for ${query}, if you want a song from another streaming service please provide a link!`)
        .setColor(colors.blue)
    message.channel.send(embed);
};