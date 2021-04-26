module.exports = {
    name: 'search',
    aliases: ['sr', 's'],
    category: 'Music',
    utilisation: '{prefix}search [name/URL]',

    run(client, message, args, Discord) {

        const config = client.config
        const emojis = require('../../assets/emojis.json')

        if (!message.member.voice.channel) return message.channel.send(`${emojis.fail} - You're not in a voice channel!`);

        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(`${emojis.fail} - You are not in the same voice channel as me!`);

        if (!args[0]) return message.channel.send(`${emojis.fail} - Please indicate the title of a song!`);

        client.player.play(message, args.join(" "));
    },
};