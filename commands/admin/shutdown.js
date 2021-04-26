module.exports = {
    name: 'shutdown',
    aliases: ["shut-down"],
    async run(client, message, args, Discord) {
        const colors = client.colors

        if (!message.author.id === '611978487066263582') return message.channel.send("Only Lingen can use this command!")

        const embed = new Discord.MessageEmbed()
            .setTitle(":wave: Good bye!")
            .setDescription("Please wait 5 seconds while I get ready to shut down.")
            .setColor(colors.red)

        message.channel.send(embed).then(_ => {
            process.exit();
        })

    }
}