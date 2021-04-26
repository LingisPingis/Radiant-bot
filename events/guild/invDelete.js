const { MessageEmbed } = require('discord.js');

module.exports = (Discord, client, message) => {

    const db = require('quick.db');
    let Delete = db.get(`invDelete_${message.guild.id}`, true)
    const colors = client.colors

    if(!Delete || message.member.hasPermission("MANAGE_MESSAGES")) return

    if(message.content.includes("discord.io/") || message.content.includes("discord.me/") || message.content.includes("discord.gg/")) {
        const embed = new MessageEmbed()
        .setColor(colors.red)
        .setDescription(`Hey ${message.author.username}! Invite links aren't allowed here!`)

        message.delete();
        message.channel.send(embed).then(m => m.delete({ timeout: 10000 }));
    }
}