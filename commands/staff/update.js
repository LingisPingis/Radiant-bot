module.exports = {
    name: 'update',
    aliases: [],

    async run(client, message, args, Discord, db) {

        if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send('Only staff members can use this command!')

        let updates;
        updates = db.get(`updates`, updates)
        let channel = message.guild.channels.cache.get(updates)
        if (!channel) message.channel.send('I could not find the update channel! you can set this up via the settings command.')

        const mention = args[0]
        const text = args.slice(1).join(" ");
        if (!text) {
            return message.channel.send("Please provide some text for me to send!");
        }
        if (text.length > 1500) {
            return message.channel.send("wowowowow- hold up there bro, that text is a little long");
        }

        const embed = new Discord.MessageEmbed()
            .setColor(client.colors.gold)
            .setTitle(":bell: Update!")
            .setFooter(`${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
            .setTimestamp()
            .setDescription(text);

        channel.send(embed)
        channel.send(mention).then(mention => mention.delete())
        message.channel.send(`Your update was sent successfully with the ping: ${args[0]}`)
    }
}