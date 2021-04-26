module.exports = {
    name: 'add-money',
    aliases: ["add-m", "add-bal", "addbal", "addmoney"],
    cooldown: 0,
    async run(client, message, args, Discord, db) {

        if (!message.member.hasPermission("MANAGE_GUILD")) return message.channel.send(new Discord.MessageEmbed().setTitle("Add Money").setDescription("You don't have the sufficient permissions to run this command!").setColor(client.colors.red))
        const user = message.mentions.users.first() || message.guild.members.cache.get(args[0]);

        if (!user) return message.channel.send(new Discord.MessageEmbed().setTitle("Add Money").setDescription("Please specify a user to add money to!").setColor(client.colors.red))

        let ammount = args[1];
        if(!ammount) return message.channel.send(new Discord.MessageEmbed().setTitle("Add Money").setDescription(`Please specify an ammount to add to ${user}'s balance!`).setColor(client.colors.red))
        if(ammount < 1) return message.channel.send(new Discord.MessageEmbed().setTitle("Add Money").setDescription(`Please specify a valid number over 1 to add to ${user}'s balance!`).setColor(client.colors.red))

        if(ammount) {
            db.add(`userdata_${user}.economy.bank`.replace("<@", "").replace(">", ""), ammount);
            return message.channel.send(new Discord.MessageEmbed().setTitle("Success").setDescription(`**${ammount}** was added to ${user}'s bank!`).setColor(client.colors.green))
        }
    }
}