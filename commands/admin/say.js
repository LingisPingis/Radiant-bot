module.exports = {
    name: 'say',
    aliases: [],

    async run(client, message, args, Discord, db) {

        let prefix;
        prefix = db.get("prefix", prefix)

        const colors = require('../../assets/colors.json');
        const emojis = require('../../assets/emojis.json');

        let action = args[0] ? args[0].toLowerCase() : undefined;
        if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(
            new Discord.MessageEmbed()
                .setTitle(emojis.fail + " Insufficient permissions!")
                .setDescription("You don't have the sufficient permissions to use this command!")
                .setColor(colors.red)
        );
        if (action && args.length < 2 || !['embed', 'normal'].includes(action)) return message.channel.send(
            new Discord.MessageEmbed()
                .setTitle(emojis.fail + " Invalid arguments!")
                .setDescription("Please provide a valid message for me to say!")
                .setColor(colors.red)
        );
        message.delete();

        const msg = message.content.replace(new RegExp(prefix + "say " + '(normal|embed)', 'gi'), '');
        if (action == 'normal') return message.channel.send(msg)
        else if (action == 'embed') return message.channel.send(
            new Discord.MessageEmbed()
                .setDescription(msg)
                .setColor(colors.blue)
        );
    }
}