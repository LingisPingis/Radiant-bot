const emojis = require('../assets/emojis.json')
const colors = require('../assets/colors.json')
const Discord = require('discord.js');
module.exports = (client, message, queue, track) => {
    const embed = new Discord.MessageEmbed()
    .setColor(colors.blue)
    .setDescription(`:notes: - ${track.title} has been added to the queue !`)
    message.channel.send(embed);
};