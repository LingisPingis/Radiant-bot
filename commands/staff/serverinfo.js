const moment = require('moment');

module.exports = {
    name: 'serverinfo',
    aliases: ["sinfo", "serveri"],

    async run(client, message, args, Discord) {

        const colors = client.colors
        const emojis = client.emojis

        // Get member stats
        const members = message.guild.members.cache.array();
        const memberCount = members.length;
        const online = members.filter((m) => m.presence.status === 'online').length;
        const offline = members.filter((m) => m.presence.status === 'offline').length;
        const dnd = members.filter((m) => m.presence.status === 'dnd').length;
        const afk = members.filter((m) => m.presence.status === 'idle').length;
        const bots = members.filter(b => b.user.bot).length;

        // Get channel stats
        const channels = message.guild.channels.cache.array();
        const channelCount = channels.length;
        const textChannels = channels.filter(c => c.type === 'text').length;
        const voiceChannels = channels.filter(c => c.type === 'voice').length;
        const newsChannels = channels.filter(c => c.type === 'news').length;
        const categoryChannels = channels.filter(c => c.type === 'category').length;

        let guild = message.guild;

        if (args[0]) {
            let found = this.client.guilds.cache.get(args[0]);
            if (!found) {
                found = this.client.cache.guilds.find((g) => g.name === args.join(" "));
                if (found) {
                    guild = found;
                }
            }
        }

        const region = {
            'us-central': 'US Central',
            'us-east': 'US East',
            'us-south': 'US South',
            'us-west': 'US West',
            'europe': 'Europe',
            'singapore': 'Singapore',
            'japan': 'Japan',
            'russia': 'Russia',
            'hongkong': 'Hong Kong',
            'brazil': 'Brazil',
            'sydney': 'Sydney',
            'southafrica': 'South Africa'
        };
        const verificationLevels = {
            NONE: 'None',
            LOW: 'Low',
            MEDIUM: 'Medium',
            HIGH: 'High',
            VERY_HIGH: 'Highest'
        };
        const notifications = {
            ALL: 'All',
            MENTIONS: 'Mentions'
        };
        guild = await guild.fetch();

        const embed = new Discord.MessageEmbed()
            .setColor(colors.gold)
            .setAuthor(guild.name, guild.iconURL({ dynamic: true }))
            .setThumbnail(guild.iconURL({ dynamic: true }))
            .addField(emojis.username + " " + ("Name"), guild.name, true)
            .addField(emojis.calendar + " " + 'Created On', `${moment(message.guild.createdAt).format('MMM DD YYYY')}`, true)
            .addField(emojis.users + " " + ("Members"), `Total: ${memberCount - bots}\n${emojis.status.online} ${online} |${emojis.status.dnd} ${dnd} |${emojis.status.idle} ${afk} |${emojis.status.offline} ${offline}`, true)
            .addField(emojis.bot + " " + ("Bots"), bots, true)
            .addField(emojis.afk + " " + ("AFK Channel"), guild.afkChannel || " " + ("No AFK Channel"), true)
            .addField(emojis.afk + " " + 'AFK Timeout', (message.guild.afkChannel) ? `\`${moment.duration(message.guild.afkTimeout * 1000).asMinutes()} minutes\`` : 'None', true)
            .addField(emojis.id + " " + ("Server ID"), guild.id, true)
            .addField(emojis.crown + " " + ("Owner"), guild.owner, true)
            .addField(emojis.region + " " + 'Region', region[message.guild.region], true)
            .addField(emojis.verificationlevel + " " + 'Verification Level', verificationLevels[message.guild.verificationLevel], true)
            .addField(emojis.notifications + " " + 'Default Notifications', notifications[message.guild.defaultMessageNotifications], true)
            .addField(emojis.boost + " " + ("Boosts"), guild.premiumSubscriptionCount || 0, true)
            .addField(emojis.boost + " " + ("Boost Level"), guild.premiumTier || "None", true)
            .addField(emojis.channel + " " + (`Channels | Total: ${channelCount} `), `Text Channels: ${textChannels} | Voice Channels: ${voiceChannels} | Categories: ${categoryChannels}`, false)
        if (message.guild.description) embed.setDescription(message.guild.description)
        if (message.guild.bannerURL) embed.setImage(message.guild.bannerURL({ dynamic: true }))
        message.channel.send(embed);

    }
}