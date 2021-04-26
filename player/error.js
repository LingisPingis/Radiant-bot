const Discord = require('discord.js');
const colors = require('../assets/colors.json')
const emojis = require('../assets/emojis.json')
const embed = new Discord.MessageEmbed()
    .setDescription('a')

module.exports = (client, error, message) => {
    switch (error) {
        case 'NotPlaying':
            embed.setDescription(`${emojis.fail} - There is no music being played in this server!`)
            message.channel.send(embed);
            break;
        case 'NotConnected':
            embed.setDescription(`${emojis.fail} - You are not connected to any voice channel!`)
            message.channel.send(embed);
            break;
        case 'UnableToJoin':
            embed.setDescription(`${emojis.fail} - I am not able to join your voice channel, please check my permissions!`)
            message.channel.send(embed);
            break;
        default:
            embed.setDescription(`${emojis.fail} - Something went wrong... Error: ${error}`)
            message.channel.send(embed);
    };
};