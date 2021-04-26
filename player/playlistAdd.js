const emojis = require('../assets/emojis.json')
const colors = require('../assets/colors.json')
const Discord = require('discord.js');

module.exports = (client, message, queue, playlist) => {
    const embed = new Discord.MessageEmbed()
        .setDescription(`:notes: - ${playlist.title} has been added to the queue (**${playlist.tracks.length}** songs queued)!`)
        .setColor(colors.blue)
    message.channel.send(embed);
};