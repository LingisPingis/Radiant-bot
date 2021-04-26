const Discord = require('discord.js');
const embed = new Discord.MessageEmbed()
    .setColor('BLUE')

module.exports = {
    name: 'queue',
    aliases: ['q'],
    category: 'Music',
    utilisation: '{prefix}queue',

    run(client, message, args) {

        const config = client.config
        const emojis = require('../../assets/emojis.json')

        embed.setDescription(`${emojis.fail} - You're not in a voice channel!`)
        if (!message.member.voice.channel) return message.channel.send(embed);

        embed.setDescription(`${emojis.fail} - You are not in the same voice channel as me!`)
        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(embed);

        const queue = client.player.getQueue(message);

        embed.setDescription(`${emojis.fail} - No music is currently playing!`)
        if (!client.player.getQueue(message)) return message.channel.send(embed);

        embed.setDescription(`**Queue for ${message.guild.name}**\n\n __Now Playing:__ ${queue.playing.title}\n\n` + (queue.tracks.map((track, i) => {
            return `\`${i + 1}.\` - ${track.title} | ${track.author} | \`requested by: ${track.requestedBy.username}\``
        }).slice(0, 10).join('\n') + `\n\n${queue.tracks.length > 10 ? `And **${queue.tracks.length - 10}** other songs...` : `In the playlist **${queue.tracks.length}** song(s)...`}`))
        embed.setFooter(`${client.player.getQueue(message).loopMode ? 'Loop: ✅' : 'Loop: ❌'}`)
        message.channel.send(embed);
    },
};