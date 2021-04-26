module.exports = {
    name: 'reactionroles',
    description: "Sets up a reaction role message!",
    async run(client, message, args, Discord, db) {

        const colors = require('../../assets/colors.json');

        if (!message.member.hasPermission("MANAGE_GUILD")) return message.channel.reply('You do not have permission to use this command.').then(m =>
            message.delete(),
            m.delete({ timeout: 3000 })
        )

        message.delete()

        let a = message.channel.id
        db.set(`reactionchannel`, a)

        let channel;
        channel = db.get(`reactionchannel`, channel);

        const announcementsEmoji = "<:announcements:834124530493423646>"
        const giveawayEmoji = "<:giveaways:834124530695667732>"
        const eventsEmoji = "<:events:834124530053414954>"
        const delusionEmoji = "<:delusion:834115870786715738>"
        const impulseEmoji = "<:impulse:834115954676858970>"
        const fragmentEmoji = "<:fragment:834116013863600169>"
        const twotakeoneEmoji = "<:2take1:834116066656387143>"
        const cheraxEmoji = "<:cherax:834116105274261554>"
        const spookyEmoji = "<:spooky:834116153877200936>"
        const xforceEmoji = "<:xforce:834116185334218809>"
        const ozarkEmoji = "<:Ozark:834116237826326548>"
        const phantomEmoji = "<:phantomx:834116323197583411>"
        const ilusionEmoji = "<:ilusion:834116494052556830>"
        const paragonEmoji = "<:paragon:834116451823910973>"

        let embed = new Discord.MessageEmbed()
            .setColor(colors.purple)
            .setTitle('Role menu: Pings')
            .setDescription(`React to give yourself the notification roles!\n\n
                ${announcementsEmoji} Announcements
                ${giveawayEmoji} Giveaways
                ${eventsEmoji} Events
                ${delusionEmoji} Delusion
                ${impulseEmoji} Impulse
                ${fragmentEmoji} Fragment
                ${twotakeoneEmoji} 2take1
                ${cheraxEmoji} Cherax
                ${spookyEmoji} Spooky
                ${xforceEmoji} X-Force
                ${ozarkEmoji} Ozark
                ${phantomEmoji} Phantom X
                ${ilusionEmoji} Ilusion Engine
                ${paragonEmoji} Paragon

            `);

        let messageEmbed = await message.channel.send(embed);

        messageEmbed.react(announcementsEmoji);
        await messageEmbed.react(giveawayEmoji);
        await messageEmbed.react(eventsEmoji);
        await messageEmbed.react(delusionEmoji);
        await messageEmbed.react(impulseEmoji);
        await messageEmbed.react(fragmentEmoji);
        await messageEmbed.react(twotakeoneEmoji);
        await messageEmbed.react(cheraxEmoji);
        await messageEmbed.react(spookyEmoji);
        await messageEmbed.react(xforceEmoji);
        await messageEmbed.react(ozarkEmoji);
        await messageEmbed.react(phantomEmoji);
        await messageEmbed.react(ilusionEmoji);
        await messageEmbed.react(paragonEmoji);

            const add = require('../../events/guild/messageReactionAdd');
            const remove = require('../../events/guild/messageReactionRemove');

            add(reaction, user);
            remove(reaction, user);
    }
}