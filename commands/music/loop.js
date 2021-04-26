const Discord = require('discord.js');
const embed = new Discord.MessageEmbed()
.setColor('BLUE')

module.exports = {
    name: 'loop',
    aliases: ['lp', 'repeat'],
    category: 'Music',
    utilisation: '{prefix}loop',

    run (client, message, args, Discord) {

        const config = client.config
        const emojis = client.emojis

        embed.setDescription(`${emojis.fail} - You're not in a voice channel!`)
        if (!message.member.voice.channel) return message.channel.send(embed);

        embed.setDescription(`${emojis.fail} - You are not in the same voice channel as me!`)
        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(embed);

        embed.setDescription(`${emojis.fail} - No music currently playing for me to loop!`)
        if (!client.player.getQueue(message)) return message.channel.send(embed);

        embed.setDescription(`${emojis.success} - Repeat **disabled**!`)
        if (args.join(" ").toLowerCase() === 'queue') {
            if (client.player.getQueue(message).loopMode) {
                client.player.setLoopMode(message, false);
                return message.channel.send(embed);
            } else {
                embed.setDescription(`${emojis.success} - Repeat mode **enabled** the whole queue will be repeated endlessly!`)
                client.player.setLoopMode(message, true);
                return message.channel.send(embed);
            };
        } else {
            embed.setDescription(`${emojis.success} - Repeat mode **disabled**!`)
            if (client.player.getQueue(message).repeatMode) {
                client.player.setRepeatMode(message, false);
                return message.channel.send(embed);
            } else {
                embed.setDescription(`${emojis.success} - Repeat mode **enabled**, the current music will be repeated endlessly!`)
                client.player.setRepeatMode(message, true);
                return message.channel.send(embed);
            };
        };
    },
};