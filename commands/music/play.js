const Discord = require('discord.js');
const embed = new Discord.MessageEmbed()
    .setColor('BLUE')

module.exports = {
    name: 'play',
    aliases: ['p'],
    category: 'Music',
    utilisation: '{prefix}play [name/URL]',

    async run(client, message, args, Discord) {

        const config = client.config
        const emojis = require('../../assets/emojis.json')

        embed.setDescription(`${emojis.fail} - You're not in a voice channel!`)
        if (!message.member.voice.channel) return message.channel.send(embed);

        embed.setDescription(`${emojis.fail} - You are not in the same voice channel as me!`)
        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(embed);

        embed.setDescription(`${emojis.fail} - Please indicate the title of the song!`)
        if (!args[0]) return message.channel.send(embed);

        client.player.play(message, args.join(" "), { firstResult: true });
    }
}