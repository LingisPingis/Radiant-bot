const db = require('quick.db');

module.exports = {
    name: 'warn',
    description: "This warns a member",
    async run(client, message, args, Discord) {
		if (message.member.hasPermission('MANAGE_MESSAGES')) {

        const user = message.mentions.users.first() || message.guild.members.cache.get(args[0]);

        if(!user) return message.channel.send('Please specify a user, via mention or ID');

        if(user.bot) return message.channel.send('You can\'t warn bots');

        if(message.author.id === user.id) return message.channel.send('You can\'t warn yourself nitwit');

        if(message.guild.owner.id === user.id) return message.channel.send('You can\'t warn the server\'s owner');

        let reason = args.slice(1).join(" ");

        if(!reason) reason = 'No reason provided';

        let warnings = db.get(`warnings_${message.guild.id}_${user.id}`);

        if(warnings === 5) return message.channel.send(`${user} has already reached five warnings`);


        if(warnings === null) {
            db.set(`warnings_${message.guild.id}_${user.id}`, 1);
            user.send(`You were warned in ${message.guild.name} for the follwoing reason: \`${reason}\``)
            await message.channel.send(`**${user.username}** has been warned for reason: **${reason}**`)
        }

        if(warnings !== null){
            db.add(`warnings_${message.guild.id}_${user.id}`, 1)
            user.send(`You were warned in ${message.guild.name} for the follwoing reason: \`${reason}\``)
            await message.channel.send(`**${user.username}** has been warned for reason: **${reason}**`)
        }
    } else message.channel.send('You can\'t use that command');
    }
}