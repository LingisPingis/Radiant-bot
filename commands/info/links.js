module.exports = {
    name: 'links',
    description: "sends a embeded message telling the user how to set up cherax",
    run (client, message, args, Discord) {

        const linkEmbed = new Discord.MessageEmbed()
            .setColor('#E5C382')
            .setTitle('**:link: Radiant Cheats links:**')
            .setThumbnail('https://cdn.discordapp.com/avatars/826552532335329281/7217fc9fe875d4a58bfd1417d3aabcd6.png?size=256')
            .addFields(
                { name: 'Our Shop', value: 'https://RadiantCheats.net/', inline: false },
                { name: 'Discord invite', value: '[https://discord.gg/thecoolestserverever](<https://discord.com/oauth2/authorize?client_id=826552532335329281&redirect_uri=https%3A%2F%2Fauth.radiantbot.com&response_type=code&scope=guilds.join%20identify>)', inline: false },
                { name: 'TrustPilot', value: '[https://www.trustpilot.com/evaluate/radiantcheats.net](<https://www.trustpilot.com/evaluate/gtacheats.net>)', inline: false },
            )

        message.channel.send(linkEmbed);

    }
}