const Discord = require('discord.js');

module.exports = {
    name: 'move',
    description: "Moves the channel to the Snow category for staff.",

    run(client, message, args) {

        const config = client.config
        const colors = client.colors

        const support = client.low
        const middle = client.middle
        const high = config.high

        const embedOne = new Discord.MessageEmbed()
            .setColor(colors.green)
            .setDescription('Successfully moved the channel.');

        if (!message.member.roles.cache.some(role => role.name === 'Staff' || message.member.hasPermission("MANAGE_MESSAGES"))) {
            embedOne.setColor(colors.red);
            embedOne.setDescription('You do not have permission to use this command!');
            return message.channel.send(embedOne)
        };

        if (message.channel.parent.id === support || message.channel.parent.id === middle || message.channel.parent.id === high) {

            if (args[0] === 'middle') {
                if (message.channel.parent.id === support || message.channel.parent.id === high) {
                    message.channel.setParent(middle)
                    message.channel.overwritePermissions(message.channel.permissionOverwrites);
                    return message.channel.send(embedOne)
                } if (message.channel.parent.id === middle) {
                    embedOne.setDescription('This ticket is already in the `middle` category!')
                    message.channel.send(embedOne)
                }
            }
            if (args[0] === 'support' || args[0] === 'normal' || args[0] === 'low') {
                if (message.channel.parent.id === middle || message.channel.parent.id === high) {
                    message.channel.setParent(support)
                    message.channel.overwritePermissions(message.channel.permissionOverwrites);
                    return message.channel.send(embedOne)

                } if (message.channel.parent.id === support) {
                    embedOne.setDescription('This ticket is already in the `support tickets` category!')
                    message.channel.send(embedOne)
                }

            }
            if (args[0] === 'high') {
                if (message.channel.parent.id === support || message.channel.parent.id === middle) {
                    message.channel.setParent(high)
                    message.channel.overwritePermissions(message.channel.permissionOverwrites);
                    return message.channel.send(embedOne)
                } if (message.channel.parent.id === high) {
                    embedOne.setDescription('This ticket is already in the `high` category!')
                    message.channel.send(embedOne)
                }
            } if (!args[0]) {
                embedOne.setDescription('Please provide a valid second argument!')
                message.channel.send(embedOne)
            }
        } else {
            embedOne.setDescription('You are allowed to use this command in support tickets only.')
            return message.channel.send(embedOne)
        };
    }
}