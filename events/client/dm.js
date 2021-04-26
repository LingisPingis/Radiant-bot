module.exports = (Discord, client, message) => {

    if (message.author.bot) return
    const db = require('quick.db');
    const config = client.config
    const colors = client.colors
    const guild = client.guilds.cache.get(config.serverID);
    const channel = guild.channels.cache.get(config.modMail);
    db.set(`modmail_${message.author.id}`, true);

    const embed1 = new Discord.MessageEmbed()
        .setTitle("Mod mail")
        .setDescription("Thank you for contacting mod mail, we will respond as soon as possible, in the meanwhile, please describe your issue with as much detail as possible.")
        .setColor(colors.green)
        .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))

    if (db.get(`modmail_${message.author.id}`), true) {
        
        const embed = new Discord.MessageEmbed()
            .setTitle("New DM!")
            .setDescription(message.content)
            .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
            .setColor(colors.purple)

        channel.send(embed)
        message.channel.send("Success!")
    } else {

        message.channel.send(embed1)
    }
}