module.exports = {
    name: 'slowmode',
    description: "Changes the slowmode",
    run(client, message, args, Discord) {

        const emojis = require('../../emojis.json');
        const colors = require('../../colors.json');

        const perms = new Discord.MessageEmbed()
            .setColor(colors.red)
            .setDescription('You do not have the permission to do this!')

        const noargs = new Discord.MessageEmbed()
            .setColor(colors.red)
            .setDescription(`${emojis.fail} - Please specify a time to for me to set the slowmode to!`)

        const toobig = new Discord.MessageEmbed()
            .setColor(colors.red)
            .setDescription(`${emojis.fail} - I can not set the slowmode above 6 hours! (21600 seconds)`)


        if (!message.member.permissions.has("BAN_MEMBERS"))
            return message.channel.send(perms);


        if (isNaN(args[0])) return message.channel.send(noargs);
        if (args[0] > 21600) return message.channel.send(toobig);
        message.channel.setRateLimitPerUser(args[0])
        const success = new Discord.MessageEmbed()
            .setColor(colors.green)
            .setDescription(`${emojis.success} - Set the slowmode to \`${args[0]}\` seconds.`)
        message.channel.send(success)

    }

}