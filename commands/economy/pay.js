module.exports = {
    name: 'pay',
    aliases: [],
    cooldown: 0,

    async run(client, message, args, Discord, db) {

        let c;
        c = db.get(`currency`, c)
        if (!c) c = "$"

        const user = message.mentions.users.first() ||  message.guild.members.cache.get(args[0]);
        if(!user) return message.channel.send(new Discord.MessageEmbed().setTitle("Pay").setDescription("You can't pay no-one, please mention someone to pay!").setColor(client.colors.red))

        if(!args[1]) return message.channel.send(new Discord.MessageEmbed().setTitle("Pay").setDescription("You need to specify an ammount to send to the user!").setColor(client.colors.red))
        if(args[1] < 1) return message.channel.send(new Discord.MessageEmbed().setTitle("Pay").setDescription(`You can't pay someone less then ${c}1!`).setColor(client.colors.red))

        let pocket = db.get(`userdata_${message.author.id}.economy.pocket`);
        if(args[1] > pocket) return message.channel.send(new Discord.MessageEmbed().setTitle("Pay").setDescription(`You don't have enough money to send that mutch!`).setColor(client.colors.red))

        if(user) {
            db.subtract(`userdata_${message.author.id}.economy.pocket`.replace("<@", "").replace(">", ""), args[1])
            db.add(`userdata_${user}.economy.pocket`.replace("<@", "").replace(">", ""), args[1])
            return message.channel.send(new Discord.MessageEmbed().setTitle("Pay").setDescription(`You payed ${c}${args[0]} to ${user}!`).setColor(client.colors.green))
        }
    }
}