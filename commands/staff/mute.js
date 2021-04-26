const Discord = require("discord.js");
const ms = require("ms");

module.exports = {
    name: 'mute',
    aliases: [],

    async run(client, message, args) {

        const colors = client.colors
        const emojis = require('../../assets/emojis.json')
        const config = client.config

        if (!message.member.hasPermission('BAN_MEMBERS')) return message.channel.send("You dont have the sufficient permissions to run this command!")

        const member = message.guild.members.cache.get(args[0]) || message.mentions.users.first()

        if (!member) {
            return message.channel.send("Please provide a valid member to mute!");
        }

        if (member.id === message.author.id) {
            return message.channel.send("Hey! You cant mute yourlself nitwit");
        }

        const time = args[1];
        if (!time || isNaN(ms(time))) {
            return message.channel.send("Please provide a valid time!");
        }

        let reason = args.slice(2).join(" ");
        if (!reason) {
            reason = ("No reason provided");
        }

        message.guild.channels.cache.forEach((channel) => {
            channel.updateOverwrite(member.id, {
                SEND_MESSAGES: false,
                ADD_REACTIONS: false,
                CONNECT: false
            }).catch(() => { });
        });

        const embed = new Discord.MessageEmbed()
            .setThumbnail(message.guild.iconURL())
            .setDescription(`**Looks like you got muted in a server!**\n\nServer: **${message.guild.name}**\nTime: **${time.toLocaleString()}**\nReason: **${reason}**\nBy: **${message.author.tag}**\n\n Please **Don't** dm any staff members about this mute as it will result in further punishments.`)
            .setColor(colors.red)
        member.send(embed).catch(_e => { console.log(_e) });

        const embed1 = new Discord.MessageEmbed()
            .setDescription(`${member} was muted for ${time.toLocaleString()} with reason:\n \`${reason}\``)
            .setColor(colors.green)

        await message.channel.send(embed1).catch(_e => { console.log(_e) });
        /*
                memberData.mute.muted = true;
                memberData.mute.endDate = Date.now() + ms(time);
                memberData.mute.case = data.guild.casesCount;
                memberData.sanctions.push(caseInfo);
        
                memberData.markModified("sanctions");
                memberData.markModified("mute");
        */
       const channel = message.guild.channels.cache.get(config.modlogs);
       if (!channel) return

        setTimeout(function () {
            message.guild.channels.cache.forEach((channel) => {
                channel.updateOverwrite(member.id, {
                    SEND_MESSAGES: null,
                    ADD_REACTIONS: null,
                    CONNECT: null
                }).catch(() => { });
            })

            const embed3 = new Discord.MessageEmbed()
            .setColor(colors.red)
            .setAuthor("Automated action: Unmute")
            .addField("Target: ", `${member}`, true)
            .addField("Target ID: ", `${member.id}`, true)
            .addField("Moderator: ", `<@${client.user.id}>`, true)
            .addField("Reason: ", "Mute expired.", true)
            .addField("Ended at: ", (new Date(Date.now())), true)
            channel.send(embed3)
        }, ms(args[1]));


        const embed2 = new Discord.MessageEmbed()
            .setColor(colors.red)
            .setAuthor('Action: Mute')
            .addField("Target: ", `${member}`, true)
            .addField("Target ID: ", `${member.id}`, true)
            .addField("Moderator: ", `<@${message.author.id}> (${message.author.id})`, true)
            .addField("Reason: ", `${reason}`, true)
            .addField("Duration: ", time, true)
            .addField("Ends at: ", (new Date(Date.now() + ms(time))), true)
        channel.send(embed2);
    }

}