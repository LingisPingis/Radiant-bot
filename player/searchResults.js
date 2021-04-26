module.exports = (client, message, query, tracks) => {
    const colors = require('../assets/colors.json')
    message.channel.send({
        embed: {
            color: colors.blue,
            author: { name: `Here are your search results for ${query}` },
            timestamp: new Date(),
            description: `${tracks.map((t, i) => `**${i + 1}** - ${t.title}`).join('\n')}`,
        },
    });
};