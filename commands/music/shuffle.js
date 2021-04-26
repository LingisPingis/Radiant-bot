const Discord = require('discord.js');
const embed = new Discord.MessageEmbed()
.setColor('BLUE')

module.exports = {
    name: 'shuffle',
    aliases: ['sh'],
    category: 'Music',
    utilisation: '{prefix}shuffle',

    run (client, message, args, Discord) {

        const config = client.config
        const emojis = require('../../assets/emojis.json')

        embed.setDescription(`${emojis.fail} - You're not in a voice channel!`)
        if (!message.member.voice.channel) return message.channel.send(embed);

        embed.setDescription(`${emojis.fail} - You are not in the same voice channel as me!`)
        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(embed);

        embed.setDescription(`${emojis.fail} - No music is currently playing!`)
        if (!client.player.getQueue(message)) return message.channel.send(embed);

        client.player.shuffle(message);

        embed.setDescription(`${emojis.success} - Queue shuffled **${client.player.getQueue(message).tracks.length}** song(s) !`)
        return message.channel.send(embed);
    },
};