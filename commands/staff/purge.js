const Discord = require("discord.js");

module.exports = {
    name: "purge",
    description: "deletes a set ammount of messages",
    aliases: ["clear"],

    async run (client, message, args) {

        const emojis = require('../../assets/emojis.json')
        const colors = client.colors

        const embedOne = new Discord.MessageEmbed()
            .setColor(colors.red)
            .setDescription(emojis.fail + " You dont have the sufficient permissions to run this command!");

        if (!message.member.permissions.has("BAN_MEMBERS")) return message.channel.send(embedOne)
            
            if (!args[0]) {
                embedOne.setColor(colors.red)
                embedOne.setDescription(emojis.fail + " Please provide a valid argument! \n ```-Purge =>10<=```")
                return message.channel.send(embedOne)
            }

            if (isNaN(args[0])) {
                embedOne.setColor(colors.red)
                embedOne.setDescription(emojis.fail + " Please provide a valid argument! \n ```-Purge =>10<=```")
                return message.channel.send(embedOne)
            }

            if (args[0] > 100) {
                embedOne.setColor(colors.red)
                embedOne.setDescription(emojis.fail + " You can not purge more then 100 messages at a time!")
                return message.channel.send(embedOne)
            }

            if (args[0] < 1) {
                embedOne.setColor(colors.red)
                embedOne.setDescription(emojis.fail + " You can not purge less then 1 message!")
                return message.channel.send(embedOne)
            }

            message.delete()
            await message.channel.messages.fetch({ limit: args[0] }).then( async messages => {
                await message.channel.bulkDelete(messages);
            });
    }
}
