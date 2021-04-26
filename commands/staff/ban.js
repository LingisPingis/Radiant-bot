const Discord = require('discord.js');

module.exports = {
    name: 'ban',
    description: "This command bans a member!",
    async run(client, message, args) {

        const colors = require("../../assets/colors.json")
        const config = require("../../assets/config.json")
        const emojis = require("../../assets/emojis.json")

        const embed = new Discord.MessageEmbed()
            .setColor('#C70000')
            .setDescription('Please provide a valid argument!');

        embed.setDescription( emojis.fail + " " + `You don't have the sufficient permsissions to execute this command!`)
        if (!message.member.permissions.has('BAN_MEMBERS')) return message.channel.send(embed)
        const target = message.mentions.users.first() || message.guild.members.cache.get(args[0]);

        if (target) {
            const memberTarget = message.guild.members.cache.get(target.id);

            //if they try ban themself the bot will return a error 
            embed.setDescription(emojis.fail + " " + 'Don\'t try to ban yourself! Just leave the server then...')
            if (memberTarget === message.member) return message.channel.send(embed)

            //if the member tries to ban the bot with its own command
            embed.setDescription(emojis.fail + " " + `Don't try to ban me or any other bot!`)
            if (target.bot) return message.channel.send(embed)

            //if the bot cant ban the member
            embed.setDescription('Hmm.. Looks like I dont have the sufficient permissions to ban this member, make sure my role is above the member you want to ban!')
            if (!memberTarget.bannable) return message.channel.send(embed)

            //if the target has manage members perm the bot wont ban them
            embed.setDescription(emojis.fail + " " + 'That member is a protected user! Therefore i cannot ban them!')
            if (memberTarget.hasPermission('MANAGE_MESSAGES')) return message.channel.send(embed)

            //if it passed all the security features above it will ban the member

            let reason = args.slice(1).join(" ");

            if (!reason) reason = 'No reason provided';

            const embed1 = new Discord.MessageEmbed()
                .setThumbnail(message.guild.iconURL())
                .setDescription(`**Looks like you got banned from a server!**\n\nServer: **${message.guild.name}**\nReason: **${reason}**\nBy: **${message.author.tag}**\n\n Please **Don't** dm any staff members about this ban as it will result in further punishments.`)
                .setColor(colors.red)
            await memberTarget.send(embed1).catch(_e => { console.log(_e) });

            await memberTarget.ban();
            embed.setColor('#00C700')
            embed.setDescription(`${emojis.success} <@${memberTarget.user.id}> has been banned for reason \`${reason}\`!`)
            message.channel.send(embed);

            const channel = message.guild.channels.cache.get(config.modlogs);
            if (!channel) return
            const embed2 = new Discord.MessageEmbed()
                .setColor(colors.red)
                .setAuthor('Action: Ban')
                .addField("Target: ", `${memberTarget}`, true)
                .addField("Target ID: ", `${memberTarget.id}`, true)
                .addField("Moderator: ", `<@${message.author.id}> (${message.author.id})`, true)
                .addField("Reason: ", `${reason}`, true)
            channel.send(embed2);

        } else {

            //if the user didnt mention a member to ban
            embed.setDescription(emojis.fail + " " + 'Please mention a valid member to ban!')
            message.channel.send(embed);

        }
        //self explanitory, its in the description, if the user doesnt have the ban members perm the bot wont ban anyone
    }
}