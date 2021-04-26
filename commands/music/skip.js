const Discord = require('discord.js');
const embed = new Discord.MessageEmbed()
    .setColor('BLUE')

module.exports = {
    name: 'skip',
    aliases: ['sk', 'next'],
    category: 'Music',
    utilisation: '{prefix}skip',

    run(client, message, args, Discord) {

        const config = client.config
        const emojis = client.emojis

        embed.setDescription(`${emojis.fail} - You're not in a voice channel!`)
        if (!message.member.voice.channel) return message.channel.send(embed);

        embed.setDescription(`${emojis.fail} - You are not in the same voice channel as me!`)
        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(embed);

        embed.setDescription(`${emojis.fail} - No music currently playing!`)
        if (!client.player.getQueue(message)) return message.channel.send(embed);

        client.player.skip(message);

        embed.setDescription(`${emojis.success} - The current music has just been **skipped**!`)
        message.channel.send(embed);
    },
};