module.exports = {
    name: 'restart',
    aliases: ['reboot', 'reload'],
    async run(client, message, args, Discord) {

        const emojis = require('../../assets/emojis.json')
        const config = client.config
        const colors = client.colors
        const { token } = require('../../assets/token.json'); 

        if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("no")

        const embed = new Discord.MessageEmbed()
            .setTitle(emojis.loading + " Restarting...")
            .setDescription("I am currently restarting, please allow this to take up to 5 seconds.")
            .setColor(colors.purple)

        message.channel.send(embed).then(() => {
            client.destroy()
            client.login(token)
        })
    }
}