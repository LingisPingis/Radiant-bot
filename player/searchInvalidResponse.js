const emojis = require('../assets/emojis.json')
const colors = require('../assets/colors.json')
const Discord = require('discord.js');

module.exports = (client, message, query, tracks, content, collector) => {
    const embed2 = new Discord.MessageEmbed()

    embed2.setDescription(`${emojis.fail} - You must send a valid number between **1** and **${tracks.length}** !`)
    embed2.setColor(colors.blue)
    if (content === 'cancel' || content === 'stop') {
        collector.stop();

        embed2.setDescription(`${client.emojis.Success} - The selection has been **cancelled** !`)
        return message.channel.send(embed2);

    } else message.channel.send(embed2);
};