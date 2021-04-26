const Discord = require('discord.js');

const embed = new Discord.MessageEmbed()
.setColor('BLUE')

module.exports = {
    name: 'stop',
    aliases: ['dc'],
    category: 'Music',
    utilisation: '{prefix}stop',

    run (client, message, args, Discord) {

        const config = client.config
        const emojis = require('../../assets/emojis.json')
        
        embed.setDescription(`${emojis.fail} - You're not in a voice channel!`)
        if (!message.member.voice.channel) return message.channel.send(embed);

        embed.setDescription(`${emojis.fail} - You are not in the same voice channel as me!`)
        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(embed);

        embed.setDescription(`${emojis.fail} - There is no music currently playing for me to stop!`)
        if (!client.player.getQueue(message)) return message.channel.send(embed);

        client.player.setRepeatMode(message, false);
        client.player.stop(message);

        embed.setDescription(`${emojis.success} - Stopped the current playing music!`)
        message.channel.send(embed);
    },
};