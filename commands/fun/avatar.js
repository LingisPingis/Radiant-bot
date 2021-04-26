module.exports = {
    name: 'avatar',
    aliases: ['av'],
    
    run(client, message, args, Discord){
        const user = message.mentions.users.first() || message.guild.members.cache.get(args[0]);
        const colors = require('../../colors.json');

        const embed = new Discord.MessageEmbed()
        .setTitle(user.username + "s avatar!")
        .setImage(user.displayAvatarURL({ dynamic: true })).catch(err => err)
        .setColor(colors.purple)

        message.channel.send(embed).catch(err => err)
    }
}