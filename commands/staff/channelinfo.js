module.exports = {
    name: "channelinfo",
    description: 'Allows you to view information on a channel.',
    aliases: ['cinfo', 'infochannel'],

    async run(client, message, args, Discord) {

        const colors = client.colors

        message.channel.send(
            new Discord.MessageEmbed()
                .setAuthor(`${message.channel.name} - (${message.channel.id})`, message.guild.iconURL())
                .addField(':shield: Information',
                    `**Channel Name**:  ${message.channel.name} 
                    **Channel ID:**  ${message.channel.id} 
                   **Channel Type:**  ${message.channel.type} 
                   **NSFW:**  ${message.channel.nsfw} `, false)
                .addField(':clipboard: More Info ',
                    `**Position:**  ${message.channel.rawPosition} 
                    **Last Message ID:**  ${message.channel.lastMessageID || (await message.channel.messages.fetch({ limit: 1 })).first().id} 
                    **Topic:**  ${message.channel.topic || 'No Topic Set!'} 
                    **Last Message Pinned:**  ${require('moment')(message.channel.lastPinAt).format('ddd, MMMM Do yyyy [at] hh:mm A') || 'none'}`, false)
                .setFooter(`${message.guild.name}`, message.guild.iconURL({ dynamic: true }))
                .setTimestamp()
                .setColor(colors.gold)
        );
    }
}