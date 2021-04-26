module.exports = {
    name: 'withdraw',
    aliases: ["with", "iwanttotakemonbeyawaiymoneyinmbanksoitssafefromrobbers"],
    async run(client, message, args, Discord, db) {

        const config = client.config
        const colors = client.colors
        const emojis = require('../../assets/emojis.json')

        let c;
        c = db.get(`currency`, c)
        if(!c) c = "$"

        let noArgsEmbed = new Discord.MessageEmbed()
            .setTitle("Invalid ammount!")
            .setDescription("Please provide a valid ammount to withdraw from your bank!")
            .setColor(colors.red)

        let money = 1
        money = db.get(`userdata_${message.author.id}.economy.bank`)

        const ammount = args[0];
        if (!ammount) return message.channel.send(noArgsEmbed)

        const notEnough = new Discord.MessageEmbed()
        .setTitle("No money!")
        .setDescription("You don't have enough money in your bank to withdraw that much!")
        .setColor(colors.red)
        if(ammount > money) return message.channel.send(notEnough)

        const bank = db.get(`userdata_${message.author.id}.economy.bank`)
        const depEmbed = new Discord.MessageEmbed()
            .setTitle("Withdraw")
            .setDescription(`You withdrawed $${money.toLocaleString()} from your bank!`)

        if (ammount === 'all') {

            db.add(`userdata_${message.author.id}.economy.pocket`, money)
            db.subtract(`userdata_${message.author.id}.economy.bank`, money)

            return message.channel.send(depEmbed)
        }
        if (ammount) {
            db.add(`userdata_${message.author.id}.economy.pocket`, ammount)
            db.subtract(`userdata_${message.author.id}.bank`, ammount)
            message.channel.send(depEmbed)
        }
    }
}