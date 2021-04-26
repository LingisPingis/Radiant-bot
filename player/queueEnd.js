const emojis = require('../assets/emojis.json')
const colors = require('../assets/colors.json')
const Discord = require('discord.js');

module.exports = (client, message, queue) => {
    const embed = new Discord.MessageEmbed()
        .setDescription(`${emojis.fail} - I disconnected as there is no more music in the queue!`)
        .setColor(colors.blue)
    message.channel.send(embed);
};