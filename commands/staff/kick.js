const Discord = require('discord.js');

module.exports = {
    name: 'kick',
    description: "This command kicks a member!",
    async run(client, message, args) {

        const colors = require("../../assets/colors.json")
        const config = require("../../assets/config.json")
        const emojis = require("../../assets/emojis.json")

        const embed = new Discord.MessageEmbed()
            .setColor('#C70000')
            .setDescription('Please provide a valid argument!');

        embed.setDescription(`:warning: You don't have the sufficient permsissions to execute this command!`)
        if (!message.member.permissions.has('BAN_MEMBERS')) return message.channel.send(embed)

        const target = message.mentions.users.first() || message.guild.members.cache.get(args[0]);

        if (target) {
            const memberTarget = message.guild.members.cache.get(target.id);

            //if they try kick themself the bot will return a error 
            embed.setDescription(emojis.fail + " " + 'Don\'t try to kick yourself! Just leave the server then...')
            if (memberTarget === message.member) return message.channel.send(embed)

            //if the member tries to kick the bot with its own command
            embed.setDescription(emojis.fail + " " + `Don't try to kick me or any other bot!`)
            if (target.bot) return message.channel.send(embed)

            //if the bot cant kick the member
            embed.setDescription('Hmm.. Looks like I dont have the sufficient permissions to kick this member, make sure my role is above the member you want to kick!')
            if (!memberTarget.kickable) return message.channel.send(embed)

            //if the target has manage members perm the bot wont kick them
            embed.setDescription(emojis.fail + " " + 'That member is a protected user! Therefore i cannot kick them!')
            if (memberTarget.hasPermission('MANAGE_MESSAGES')) return message.channel.send(embed)

            //if it passed all the security features above it will kick the member

            let reason = args.slice(1).join(" ");

            if (!reason) reason = 'No reason provided';

            const embed1 = new Discord.MessageEmbed()
                .setThumbnail(message.guild.iconURL())
                .setDescription(`**Looks like you got kicked from a server!**\n\nServer: **${message.guild.name}**\nReason: **${reason}**\nBy: **${message.author.tag}**\n\n Please **Don't** dm any staff members about this kick as it will result in further punishments.`)
                .setColor(colors.red)
            await memberTarget.send(embed1).catch(_e => { console.log(_e) });

            await memberTarget.kick();
            embed.setColor('#00C700')
            embed.setDescription(emojis.success + " " + `<@${memberTarget.user.id}> has been kicked for reason \`${reason}\`!`)
            message.channel.send(embed);

            const channel = message.guild.channels.cache.get(config.modlogs);
            if (!channel) return
            const embed2 = new Discord.MessageEmbed()
                .setColor(colors.red)
                .setAuthor('Action: Kick')
                .addField("Target: ", `${memberTarget.user.tag}`, true)
                .addField("Target ID: ", `${memberTarget.id}`, true)
                .addField("Moderator: ", `<@${message.author.id}> (${message.author.id})`, true)
                .addField("Reason: ", `${reason}`, true)
            channel.send(embed2);

        } else {

            //if the user didnt mention a member to kick
            embed.setDescription(emojis.fail + " " + 'Please mention a valid member to kick!')
            message.channel.send(embed);

        }
        //self explanitory, its in the description, if the user doesnt have the kick members perm the bot wont kick anyone

    }
}