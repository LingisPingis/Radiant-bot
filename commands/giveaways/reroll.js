const ms = require('ms');

module.exports = {
    name: 'reroll',

    run (client, message, args, Discord) {

        // If the member doesn't have enough permissions
        if (!message.member.hasPermission('MANAGE_MESSAGES') && !message.member.roles.cache.some((r) => r.name === "Giveaways")) {
            return message.channel.send(':x: You need to have the manage messages permissions to reroll giveaways.');
        }

        // If no message ID or giveaway name is specified
        if (!args[0]) {
            return message.channel.send(':x: You have to specify a valid message ID!');
        }

        // try to found the giveaway with prize then with ID
        let giveaway =
            // Search with giveaway prize
            client.giveawaysManager.giveaways.find((g) => g.prize === args.join(' ')) ||
            // Search with giveaway ID
            client.giveawaysManager.giveaways.find((g) => g.messageID === args[0]);

        // If no giveaway was found
        if (!giveaway) {
            return message.channel.send('Unable to find a giveaway for `' + args.join(' ') + '`.');
        }

        // Reroll the giveaway
        client.giveawaysManager.reroll(giveaway.messageID)
            .then(() => {
                // Success message
                message.channel.send('Giveaway rerolled!');
            })
            .catch((e) => {
                if (e.startsWith(`Giveaway with message ID ${giveaway.messageID} has not ended yet, therefor i can not reroll it.`)) {
                    message.channel.send('This giveaway has not ended yet!');
                } else {
                    console.error(e);
                    message.channel.send('An error occured...');
                }
            });

    }
}