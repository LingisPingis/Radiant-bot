module.exports = (client, message, args, Discord, db) => {

    const colors = client.colors
    let updates = args[1]

    if (!args[1]) return message.channel.send(new Discord.MessageEmbed().setTitle("Error").setDescription("Please specify the id of the channel you want to set the update channel as!").setColor(colors.red))
    if (args[1] === 'off') {
        db.delete(`updates`, updates)
        return message.channel.send(new Discord.MessageEmbed().setTitle("Success").setDescription(`The updates channel has been unset!`).setColor(colors.green))
    }
    if (args[0]) {

        updates = args[1]
        db.set(`updates`, updates)
        message.channel.send(new Discord.MessageEmbed().setTitle("Success").setDescription(`The updates channel has been set to <#${updates}>!`).setColor(colors.green))
    }
}