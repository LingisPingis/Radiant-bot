const emojis = require('../assets/emojis.json')
const colors = require('../assets/colors.json')
const Discord = require('discord.js');

module.exports = (client, message, query, tracks) => {
    
const embed = new Discord.MessageEmbed()
.setDescription(`${emojis.fail} - You did not provide a valid response in time. Please try again!`)
.setColor(colors.blue)
    message.channel.send(embed);
};