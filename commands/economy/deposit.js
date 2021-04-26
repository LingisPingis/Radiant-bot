module.exports = {
    name: 'deposit',
    aliases: ["dep", "iwanttoputmoneyinmbanksoitssafefromrobbers"],
    async run(client, message, args, Discord, db) {

        const config = client.config
        const colors = client.colors
        const emojis = client.emojis

        let noArgsEmbed = new Discord.MessageEmbed()
            .setTitle("Invalid ammount!")
            .setDescription("Please provide a valid ammount to deposit into your bank!")
            .setColor(colors.red)

        let money = 1
        money = db.get(`userdata_${message.author.id}.economy.pocket`)

        const ammount = args[0];
        if (!ammount) return message.channel.send(noArgsEmbed)

        let c;
        c = db.get(`currency`, c);
        if(!c) c = "$"

        const notEnough = new Discord.MessageEmbed()
        .setTitle("No money!")
        .setDescription("You don't have enough money in your pocket to deposit that much!")
        .setColor(colors.red)
        if(ammount > money) return message.channel.send(notEnough)

        const bank = db.get(`userdata_${message.author.id}.bank`, money)
        const depEmbed = new Discord.MessageEmbed()
            .setTitle("Deposit")

            if(money) {
            depEmbed.setDescription(`You deposited ${c}${money.toLocaleString()} into your bank!`)
            } else depEmbed.setDescription(`You deposited ${c}${money} into your bank!`)

        if (ammount === 'all') {

            db.subtract(`userdata_${message.author.id}.economy.pocket`, money)
            db.add(`userdata_${message.author.id}.bank`, money)

            return message.channel.send(depEmbed)
        }
        if (ammount) {
            db.subtract(`userdata_${message.author.id}.economy.pocket`, ammount)
            db.add(`userdata_${message.author.id}.bank`, ammount)
            message.channel.send(depEmbed)
        }
    }
}