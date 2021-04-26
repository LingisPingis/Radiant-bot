/*const db = require('quick.db');
const emojis = require('../../emojis.json');
const colors = require('../../colors.json');

module.exports = {
    name: 'oldwarn',
    aliases: [],
    async run(client, message, args, Discord) {

        // creating an embed, for later use.
        const embed = new Discord.MessageEmbed()
            .setDescription(`${emojis.fail} You don't have the sufficient permissions to run this command!`)
            .setColor(`${colors.red}`)

        const embed1 = new Discord.MessageEmbed()

        // if the user doesnt have manage messages permission the user wont be able to warn anyone.
        if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send(embed);

        // if the moderator provides a mention or id to the user to warn.
        const user = message.mentions.users.first() || message.guild.members.cache.get(args[0]);

        // if they didnt mention anyone.
        embed.setDescription(`${emojis.fail} Please specify a valid user via mention or ID!`)
        if (!user) return message.channel.send(embed);

        // if the user tries to warn a bot
        embed.setDescription(`${emojis.fail} You can\'t warn bots!`)
        if (user.bot) return message.channel.send(embed);

        // if the user tries to wanrn themself
        embed.setDescription(`${emojis.fail} You can\'t warn yourself nitwit!`)
        if (message.author.id === user.id) return message.channel.send(embed);

        // if the user tries to warn the server owner
        embed.setDescription(`${emojis.fail} You can\'t warn the server owner!`)
        if (message.guild.owner.id === user.id) return message.channel.send(embed);

        // if the user has a reason with more then 1 word it will make it all show up
        var reason = args.slice(1).join(" ");

        // if the user didnt provide a reason
        if (!reason) reason = 'No reason provided';

        let warnings = db.get(`warnings_${message.guild.id}_${user.id}_${reason}`);

        if (warnings === null) {
            db.set(`warnings_${message.guild.id}_${user.id}_${reason}`, 1);
            embed.setDescription(`You were warned in **${message.guild.name}** for reason:\n \`${reason}\``)
            user.send(embed)

            embed1.setColor(`${colors.green}`)
            embed1.setDescription(`${emojis.success} **${user.username}** has been warned for: \`${reason}\``)
            await message.channel.send(embed1)
        }

        const embed2 = new Discord.MessageEmbed()
            .setDescription(`You were warned in **${message.guild.name}** for reason:\n \`${reason}\``)
            .setFooter(`Moderator: ${message.author.tag}`)
            .setColor(`${colors.red}`)

        const embed3 = new Discord.MessageEmbed()
            .setColor(`${colors.green}`)
            .setDescription(`${emojis.success} **${user.username}** has been warned for: \`${reason}\``)
            .setColor(`${colors.green}`)

        if (warnings !== null) {
            db.add(`warnings_${message.guild.id}_${user.id}_${reason}`, 1)
            user.send(embed2).catch(_e => { console.log(_e) });

            await message.channel.send(embed3)
        }
    }
}
*/