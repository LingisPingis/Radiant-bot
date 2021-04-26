module.exports = {
    name: 'buyerrequest',
    aliases: [],
    async run(client, message, args, Discord) {
 
        message.delete();
        const config = require('../../config.json');
        const db = require('quick.db')
        const colors = require('../../colors.json');
        const embed = new Discord.MessageEmbed()
            .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
            .setDescription("Please provide a image with proof of purchase and we will review your request as soon as possible.")
            .setColor(colors.red)
        if (!args[0]) return message.channel.send(embed).then(m => m.delete({ timeout: 10000 }))

        embed.setDescription("Please provide a link to a screenshot of your order history.")

        if (!message.content.includes("https://")) return message.channel.send(embed).then(m => m.delete({ timeout: 10000 }))
        if (message.content.includes("https://")) {    
            embed.setColor(colors.blue)
            embed.setDescription(`<@${message.author.id}> has requested the buyer role!\nUser ID: ${message.author.id}\nImage Link: [Click Me](<${args[0]}>)`)
            embed.setImage(args[0])

            let prefix = "a"
            prefix = db.get(`buyerChannel_${message.guild.id}`, prefix)
            const channel = message.guild.channels.cache.get(prefix)
            if (!channel) message.channel.send('I could not find the buyer request channel! Please ask a staff member to set this command up by doing `-settings buyerchannel <#channel>`!')
            channel.send(embed).catch(err => console.log(err))

            const embed1 = new Discord.MessageEmbed()
            .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
            .setColor(colors.green)
            .setDescription("Success! Your request will be reviewed as soon as possible!")
            await message.channel.send(embed1).then(m => m.delete({ timeout: 10000 }))
        }
    }
}