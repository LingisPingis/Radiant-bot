module.exports = {
    name: 'balance',
    aliases: ["bal", "money", "howmuchmoneydoihave"],
    async run(client, message, args, Discord, db) {

        const config = client.config
        const colors = client.colors
        const emojis = client.emojis

        let user = message.mentions.users.first();
        if (!user) user = message.author

        let pocket = 'some value that will change later'
        let bank = 'some value that will change later'
        bank = db.get(`userdata_${user.id}.economy.bank`.replace("<@", "").replace(">", ""))
        pocket = db.get(`userdata_${user.id}.economy.pocket`.replace("<@", "").replace(">", ""))

        let c;
        c = db.get(`currency`, c)
        if (!c) c = "$"
        let noMoneyEmbed = new Discord.MessageEmbed()
            .setAuthor(`${user.username}'s Balance`.replace("<@<@", "<@").replace(">>", ">").replace(">", "").replace("<@", ""), user.displayAvatarURL({ dynamic: true }))
            .addField("Pocket", `${c}0`, true)
            .addField("Bank", `${c}0`, true)
            .setColor(colors.blue)

        if (!pocket && !bank) return message.channel.send(noMoneyEmbed)
        const embed = new Discord.MessageEmbed()
            .setAuthor(`${user.username}'s Balance`.replace("<@<@", "<@").replace(">>", ">").replace(">", "").replace("<@", ""), user.displayAvatarURL({ dynamic: true }))
            .setColor(colors.purple)

        if (pocket) {
            embed.addField("Pocket", `${c}${pocket.toLocaleString()}`.replace("null", "0"), true)
        } else embed.addField("Pocket", `${c}0`, true)
        if (bank) {
            embed.addField("Bank", `${c}${bank.toLocaleString()}`.replace("null", "0"), true)
        } else embed.addField("Bank", `${c}0`, true)

        return message.channel.send(embed)
    }
}