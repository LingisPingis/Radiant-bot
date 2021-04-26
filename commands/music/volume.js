const Discord = require('discord.js');
const embed = new Discord.MessageEmbed()
    .setColor('BLUE')

module.exports = {
    name: 'volume',
    aliases: ['vol'],
    category: 'Music',
    utilisation: '{prefix}volume [1-100]',

    run(client, message, args, Discord) {

        const config = client.config
        const emojis = require('../../assets/emojis.json')

        embed.setDescription(`${emojis.fail} - You're not in a voice channel!`)
        if (!message.member.voice.channel) return message.channel.send(embed);

        embed.setDescription(`${emojis.fail} - You are not in the same voice channel as me!`)
        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(embed);

        embed.setDescription(`${emojis.fail} - No music is currently playing!`)
        if (!client.player.getQueue(message)) return message.channel.send(embed);

        embed.setDescription(`${emojis.fail} - Please enter a valid number between 1 and 100!`)
        if (!args[0] || isNaN(args[0]) || args[0] === 'Infinity') return message.channel.send(embed);

        embed.setDescription(`${emojis.fail} - Please enter a valid number between 1 and 100!`)
        if (Math.round(parseInt(args[0])) < 1 || Math.round(parseInt(args[0])) > 100) return message.channel.send(embed);

        client.player.setVolume(message, parseInt(args[0]));

        embed.setDescription(`${emojis.success} - Volume set to **${parseInt(args[0])}%** !`)
        message.channel.send(embed);
    },
};