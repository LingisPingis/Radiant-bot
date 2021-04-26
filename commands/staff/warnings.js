const db = require('quick.db');

module.exports = {
    name: 'warnings',
    description: "This warns a member",
    aliases: ['warns'],
    async run(client, message, args, Discord) {
		if (message.member.hasPermission('MANAGE_MESSAGES')) {
        const user = message.mentions.users.first() || message.guild.members.cache.get(args[0]) || message.author;


        let warnings = await db.get(`warnings_${message.guild.id}_${user.id}`);

        if(warnings === null) warnings = 0;

        message.channel.send(`**${user.username}** has **${warnings}** warning(s)`);
    } else message.channel.send("You don't have the sufficient permsissions to execute this command!")
}
}