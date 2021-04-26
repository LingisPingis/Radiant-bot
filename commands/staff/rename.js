module.exports = {
    name: "trename",
    description: "renames a channel",
    aliases: ['tname'],

    async run (client, message, args , Discord) {

        const colors = client.colors
        const config = client.config

        const errorEmbed = new Discord.MessageEmbed()
        .setDescription('Error! Insufficient permsissions!')
        .setColor(colors.red)
        
        const wrongCategoryEmbed = new Discord.MessageEmbed()
        .setDescription('Error! The channel you are trying to rename isn\'t a ticket channel!')
        .setColor(colors.red)
        
        const SuccessEmbed = new Discord.MessageEmbed()
        .setDescription('Successfully renamed the channel!')
        .setColor(colors.green)

        if (message.member.permissions.has('MANAGE_MESSAGES')) {

            if (message.channel.parent.id == config.low || message.channel.parent.id == config.middle || message.channel.parent.id == config.high ) {
                message.channel.setName(args.slice(1).join(" ").replace(' ', '-'))
                message.channel.send(SuccessEmbed)
            } else message.channel.send(wrongCategoryEmbed)
            
        } else message.channel.send(errorEmbed)
    }
}