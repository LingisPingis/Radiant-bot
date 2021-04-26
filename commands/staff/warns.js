module.exports = {
    name: 'warns',
    aliases: ['warnings'],
    async run(client, message, args, Discord) {
        const db = require('quick.db');
        const colors = client.colors
        const emojis = client.emojis
        const { MessageEmbed } = require('discord.js');
        const embed = new MessageEmbed()
        .setColor(`${colors.red}`)

        embed.setDescription(`${emojis.fail} You don't have the suffiecient permissions to use this command!`)
        if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send(embed)

        const user = message.mentions.users.first() || message.guild.members.cache.get(args[0]) || message.author;

//        const reason = await db.get(`wa`)

        var warnings = await db.get(`warnings_${message.guild.id}_${user.id}`);//_${reason}

        if (warnings === null) warnings = 0;

        let embed1 = new MessageEmbed()
        .setColor(`${colors.gray}`)
        .setDescription(`**${user.tag} Has ${warnings} warnings** \n\n`)
        message.channel.send(embed1);

    }
}