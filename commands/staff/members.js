module.exports = {
    name: 'members',
    aliases: ["users"],

    run(client, message, args, Discord) {

        const colors = client.colors
        const emojis = require('../../assets/emojis.json')

        const members = message.guild.members.cache.array();
        const memberCount = members.length;
        const online = members.filter((m) => m.presence.status === 'online').length;
        const offline = members.filter((m) => m.presence.status === 'offline').length;
        const dnd = members.filter((m) => m.presence.status === 'dnd').length;
        const afk = members.filter((m) => m.presence.status === 'idle').length;
        const bots = members.filter(b => b.user.bot).length;

        const embed = new Discord.MessageEmbed()
            .setColor(colors.gold)
            .setTitle(`Member info for **${message.guild.name}**`)
            .setDescription(`${emojis.users} Total: ${memberCount}\n\n${emojis.status.online}Online: ${online}\n${emojis.status.idle}Idle: ${afk}\n${emojis.status.dnd}Do not disturb: ${dnd}\n${emojis.status.offline}Offline: ${offline}\n${emojis.bot} Bots: ${bots}`)
            .setThumbnail(message.guild.iconURL({ dynamic: true }))

        message.channel.send(embed)
    }
}