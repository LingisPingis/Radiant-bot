const Discord = require('discord.js');
const emojis = require('../assets/emojis.json')
const colors = require('../assets/colors.json')
module.exports = (client, message, queue) => {
    const embed = new Discord.MessageEmbed()
        .setDescription(`${emojis.fail} - Music stopped as I am the only one left in the voice channel!`)
        .setColor(colors.blue)
    message.channel.send(embed);
};