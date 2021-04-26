module.exports = (Discord, client) => {
    // Init discord giveaways
    const { GiveawaysManager } = require('discord-giveaways');
    client.giveawaysManager = new GiveawaysManager(client, {
        storage: "./giveaways.json",
        updateCountdownEvery: 3000,
        default: {
            botsCanWin: false,
            embedColor: "#FFCC33",
            reaction: "🎉"
        }
    });
}