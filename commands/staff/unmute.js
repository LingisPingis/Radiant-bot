module.exports = {
    name: 'unmute',
    aliases: [],
    async run(client, message, args, Discord) {

        const config = client.config
        const colors = client.colors

        if(!message.member.hasPermission('BAN_MEMBERS')) return message.channel.send('You dont have the sufficient permissions to run this command!')

        const member = message.guild.members.cache.get(args[0]) || message.mentions.users.first()
        if (!member) {
            return message.channel.send("Please provide a valid member to mute!");
        }

        message.guild.channels.cache.forEach((channel) => {
            channel.updateOverwrite(member.id, {
                SEND_MESSAGES: null,
                ADD_REACTIONS: null,
                CONNECT: null
            }).catch(() => { });
        })
        message.channel.send(`Successfully unmuted ${member}!`) 
    
        const channel = message.guild.channels.cache.get(config.modlogs);
        if (!channel) return
        const embed2 = new Discord.MessageEmbed()
            .setColor(colors.red)
            .setAuthor('Action: Unmute')
            .addField("Target: ", `${member}`, true)
            .addField("Target ID: ", `${member.id}`, true)
            .addField("Moderator: ", `<@${message.author.id}> (${message.author.id})`, true)
        channel.send(embed2);

    }
}