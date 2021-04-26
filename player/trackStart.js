const emojis = require('../assets/emojis.json')
const colors = require('../assets/colors.json')
const Discord = require('discord.js');

module.exports = (client, message, track) => {
    const embed = new Discord.MessageEmbed()
    .setDescription(`:notes: - Now playing ${track.title} into ${message.member.voice.channel.name}...`)
    .setColor(colors.blue)
    message.channel.send(embed);
};