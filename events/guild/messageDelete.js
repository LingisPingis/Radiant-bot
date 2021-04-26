module.exports = (Discord, client, messageDelete, message) => {
    const colors = client.colors
    const emojis = client.emojis
    const config = client.config
    const ignoredChannels = [config.managerChat, config.memo, config.adminChat, config.secretLogs, config.logs];

    if (messageDelete.channel.type === 'dm') return
    //if (messageDelete.user.bot) return
    if (messageDelete.guild.id != config.serverID) return
    if (ignoredChannels.includes(messageDelete.channel.id)) return

    const channelID = config.logs;
    const channel = messageDelete.guild.channels.cache.get(channelID);
    const deleteEmbed = new Discord.MessageEmbed()
        .setColor(colors.purple)
        .setAuthor(messageDelete.author.tag, messageDelete.author.displayAvatarURL({ dynamic: true }))
        .setDescription(`**Message by ${messageDelete.author} was deleted in ${messageDelete.channel}** \n${messageDelete.content}`)
        .setFooter(`Message ID: ${messageDelete.id} `)
        .setTimestamp();

    if (!channel) return;
    return channel.send(deleteEmbed).catch(err => err)
}