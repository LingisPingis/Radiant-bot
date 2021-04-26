module.exports = {
    name: 'coinflip',
    aliases: ["coinflop"],

    async run(client, message, args, Discord, db) {
 return
        const colors = client.colors
        const coin = Math.floor(Math.random() * 2)

        const tailsEmbed = new Discord.MessageEmbed()
        .setTitle("Coinflip!")
        .setDescription(`You flipped a coin and it landed on ${coin} and you won 500`.replace(1, "heads").replace(0, "tails"))
        .setColor(colors.purple)

        let money = 500
        console.log(coin)
        if (coin == 0) {

            message.channel.send(tailsEmbed)
            db.add(`bank_${message.author.id}`, money)
        }
        if (coin == 1) {
            message.channel.send(tailsEmbed)
            db.add(`bank_${message.author.id}`, money)
        }
    }
}