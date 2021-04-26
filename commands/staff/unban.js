const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'unban',
    async run(client, message, args, Discord) {

        const config = require("../../assets/config.json")
        const colors = require("../../assets/colors.json")
        const emojis = require("../../assets/emojis.json")

        if (!message.member.hasPermission('BAN_MEMBERS')) return message.channel.send('You dont have the sufficient permissions to run this command!')

        if (!args[0]) return message.channel.send('please enter a user id to unban!')

        let member;

        try {
            member = await client.users.fetch(args[0])
        } catch (e) {
            console.log(e)
            return message.channel.send('Not a valid user!')
        }

        const reason = args[1] ? args.slice(1).join(' ') : 'no reason provided';

        const embed = new MessageEmbed()
            .setFooter(`${message.author.tag} | ${message.author.id}`, message.author.displayAvatarURL({ dynamic: true }));

        message.guild.fetchBans().then(bans => {

            const user = bans.find(ban => ban.user.id === member.id);

            if (user) {
                embed.setTitle(emojis.success + " " + `Successfully Unbanned ${user.user.tag}!`)
                embed.setColor(colors.green)
                message.guild.members.unban(user.user.id, reason).then(() => message.channel.send(embed))

                const channel = message.guild.channels.cache.get(config.modlogs);
                if (!channel) return
                const embed2 = new Discord.MessageEmbed()
                    .setColor(colors.red)
                    .setAuthor('Action: Unban')
                    .addField("Target: ", `${member}`, true)
                    .addField("Target ID: ", `${member.id}`, true)
                    .addField("Moderator: ", `<@${message.author.id}> (${message.author.id})`, true)
                    .addField("Reason: ", `${reason}`, true)
                    channel.send(embed2);
            } else {
                embed.setTitle(`User ${member.tag} isn't banned!`)
                    .setColor(colors.green)
                message.channel.send(embed)
            }

        }).catch(e => {
            console.log(e)
            message.channel.send(`An error has occurred!\nError: **${e}**`)
        });

    }
}