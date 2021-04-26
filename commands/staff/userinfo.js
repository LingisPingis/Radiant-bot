const moment = require('moment')

module.exports = {
    name: 'userinfo',
    aliases: ['ui', 'useri', 'uinfo', 'whois'],

    async run(client, message, args, Discord) {
        
        let displayPresence = true;

        var user = message.mentions.users.first() || message.guild.members.cache.get(args[0]) || message.author;

        if (!user) {
            return message.channel.send("Please provide a valid user!");
        }

        let member = null;
        if (message.guild) {
            member = await message.guild.members.fetch(user).catch(() => { });
        }

        const emojis = require('../../assets/emojis.json');

        const embed = new Discord.MessageEmbed()
            .setAuthor(user.tag, user.displayAvatarURL())
            .setThumbnail(user.displayAvatarURL({ dynamic: true }))
            .addField(emojis.username + (" Username"), user.username, true)
            .addField(emojis.discriminator + " " + (" Discriminator"), user.discriminator, true)
            .addField(emojis.bot + " " + (" Bot"), (user.bot ? ("True") : ("False")), true)
            .addField(emojis.calendar + " " + ' Created On', `${moment(user.createdAt).format('MMM DD YYYY')}`, true)
            .addField(emojis.avatar + " " + (" Avatar"), user.displayAvatarURL().replace('.webp', '.png'))
            .setColor(member.roles.highest.color)
            .setFooter(`ID: ${user.id}`);

        if (displayPresence) {
            if (user.presence.status === 'online') emoji = emojis.status.online
            if (user.presence.status === 'idle') emoji = emojis.status.idle
            if (user.presence.status === 'dnd') emoji = emojis.status.dnd
            if (user.presence.status === 'offline') emoji = emojis.status.offline

            embed.addField(emojis.games + " " + " Playing", user.presence.game ? user.presence.game.name : " None", true)
                .addField(emoji + " " + (" Status"), (" " + (user.presence.status.toLowerCase().replace('dnd', 'do not disturb'))), true);
        }

        if (member) {
            embed.addField(emojis.up + " " + (" Top Role"), (member.roles.highest ? member.roles.highest : (" No Roles")), true)
                .addField(emojis.calendar2 + " " + ' Joined At', `${moment(member.guild.joinedAt).format('MMM DD YYYY')}`, true)
                .addField(emojis.color + " " + (" Top Role Color"), member.displayHexColor, true)
                .addField(emojis.pencil + " " + (" Nickname"), (member.nickname ? member.nickname : (" No Nickname")), true)
                .addField(emojis.roles + " " + (" Roles"), (
                    member.roles.size > 10
                        ? member.roles.cache.map((r) => r).slice(0, 9).join(", ") + " " + (" More Roles", { count: member.roles.cache.size - 10 })
                        : (member.roles.cache.size < 1) ? (" No Roles") : member.roles.cache.map((r) => r).join(", ")
                ));
        }
        message.channel.send(embed);
    }
}