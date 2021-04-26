module.exports = {
    name: 'respond',
    aliases: [],
    async run(client, message, args, Discord) {

        const config = client.config
        const colors = client.colors
        const user = message.mentions.users.first();
 
        let text = args.slice(1).join(" ")
        const embed = new Discord.MessageEmbed()
            .setTitle("Mod mail response")
            .setDescription(text)
            .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
            .setColor(colors.purple)

        user.send(embed)
    }
}