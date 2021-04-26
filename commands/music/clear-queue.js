module.exports = {
    name: 'clear-queue',
    aliases: ['cq'],
    category: 'Music',
    utilisation: '{prefix}clear-queue',

    run (client, message, args, Discord) {

        const config = client.config
        const emojis = client.emojis

        const embed = new Discord.MessageEmbed()
            .setColor('BLUE')

        embed.setDescription(`${emojis.fail} - You're not in a voice channel!`)
        if (!message.member.voice.channel) return message.channel.send(embed);

        embed.setDescription(`${emojis.fail} - You are not in the same voice channel as me!`)
        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(embed);

        embed.setDescription(`${emojis.fail} - No music is currently playing!`)
        if (!client.player.getQueue(message)) return message.channel.send(embed);

        embed.setDescription(`${emojis.fail} - There is only one song in the queue.`)
        if (client.player.getQueue(message).tracks.length <= 1) return message.channel.send(embed);

        client.player.clearQueue(message);

        embed.setDescription(`${emojis.success} - The queue has been **removed**!`)
        message.channel.send(embed);
    },
};