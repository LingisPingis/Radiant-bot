module.exports = {
    name: 'set-money',
    aliases: ["set-m", "set-bal", "setbal", "setmoney"],
    cooldown: 0,
    async run(client, message, args, Discord, db) {

        if (!message.member.hasPermission("MANAGE_GUILD")) return message.channel.send(new Discord.MessageEmbed().setTitle("Add Money").setDescription("You don't have the sufficient permissions to run this command!").setColor(client.colors.red))
        const user = message.mentions.users.first() || message.guild.members.cache.get(args[0]);

        if (!user) return message.channel.send(new Discord.MessageEmbed().setTitle("Add Money").setDescription("Please specify a user to set the money of!").setColor(client.colors.red))

        let ammount = args[1];
        if(!ammount) return message.channel.send(new Discord.MessageEmbed().setTitle("Add Money").setDescription(`Please specify an ammount to set ${user}'s balance to!`).setColor(client.colors.red))
        if(ammount < 1) return message.channel.send(new Discord.MessageEmbed().setTitle("Add Money").setDescription(`Please specify a valid number over 1 to set ${user}'s balance to!`).setColor(client.colors.red))

        if(ammount) {
            db.set(`userdata_${user}.economy.bank`.replace("<@", "").replace(">", ""), ammount);
            return message.channel.send(new Discord.MessageEmbed().setTitle("Success").setDescription(`${user}'s balance is now set to **${ammount}**!`).setColor(client.colors.green))
        }
    }
}