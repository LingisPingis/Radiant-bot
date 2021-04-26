module.exports = (client, message, args, Discord, db) => {

    let buyerrole;
    if (!args[1]) return message.channel.send(new Discord.MessageEmbed().setTitle("Error").setDescription("Please specify the role id that you want to set as the buyer role!").setColor(client.colors.red))
    if (args[1] === 'off') {
        db.delete(`buyerrole`, buyerrole)
        return message.channel.send(new Discord.MessageEmbed().setTitle("Success").setDescription("I have now removed the buyer role from the options.").setColor(client.colors.green))
    }
    if(args[1]) {
        buyerrole = args[1];

        buyerrole.replace("<@", "").replace(">", "")
        db.set(`buyerrole`, buyerrole)
        return message.channel.send(new Discord.MessageEmbed().setTitle("Success").setDescription(`I have set the buyerrole to <@&${buyerrole}>!`))
    }
}