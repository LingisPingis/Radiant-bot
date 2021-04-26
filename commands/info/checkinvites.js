module.exports = {
    name: 'checkinvites',
    alises: ["checkinvitations", "check-invites"],
    async run(client, message, args, Discord) {

        const colors = client.colors

        const members = message.guild.members;

        const withInvite = [];
        members.cache.forEach((m) => {
            const possibleLinks = m.user.presence.activities.map((a) => [a.state, a.details, a.name]).flat();
            const inviteLinks = possibleLinks.filter((l) => /(discord\.(gg|io|me|li)\/.+|discordapp\.com\/invite\/.+)/i.test(l));
            if (inviteLinks.length > 0) {
                withInvite.push({
                    id: m.user.id,
                    tag: Discord.Util.escapeMarkdown(m.user.tag),
                    links: "**" + Discord.Util.escapeMarkdown(inviteLinks.join(", ")) + "**"
                });
            }
        });

        const text = (withInvite.length > 0 ?
            withInvite.map((m) => "<@!" + m.id + ">" + " |   " + m.links).join("\n")
            : message.translate("horray! No one has any invites in their status!"));

        const embed = new Discord.MessageEmbed()
            .setTitle("Invites shown in " + "**" + message.guild.name + "**")
            .setDescription(text)
            .setColor(colors.gold)
            .setFooter(message.author.username, message.author.displayAvatarURL({ dynamic: true }));

        message.channel.send(embed);
    }
}