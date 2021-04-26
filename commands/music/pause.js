const Discord = require('discord.js');
const { player } = require('discord-player');
const embed = new Discord.MessageEmbed()
.setColor('BLUE')

module.exports = {
    name: 'pause',
    aliases: [],
    category: 'Music',
    utilisation: '{prefix}pause',

    run (client, message, args, Discord) {

        const config = client.config
        const emojis = require('../../assets/emojis.json')

        embed.setDescription(`${emojis.fail} - You're not in a voice channel!`)
        if (!message.member.voice.channel) return message.channel.send(embed);

        embed.setDescription(`${emojis.fail} - You are not in the same voice channel as me!`)
        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(embed);

        embed.setDescription(`${emojis.fail} - No music currently playing!`)
        if (!client.player.getQueue(message)) return message.channel.send(embed);

        embed.setDescription(`${emojis.fail} - The music is already paused!`)
        if (client.player.getQueue(message).paused) return message.channel.send(embed);

        client.player.pause(message);

        embed.setDescription(`${emojis.success} - Song ${client.player.getQueue(message).playing.title} paused!`)
        message.channel.send(embed);
    },
};