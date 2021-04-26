const { MessageEmbed } = require("discord.js");
const randomPuppy = require("random-puppy");
module.exports = {
    name: "meme",
    description: "Sends a random meme from Reddit",
    async run(client, message, args, Discord) {

        const colors = client.colors
        const subReddits = ["dankmemes", "meme",];
        const random = subReddits[Math.floor(Math.random() * subReddits.length)];

        const img = await randomPuppy(random);
        const embed = new MessageEmbed()
            .setColor(colors.gold)
            .setImage(img)
            .setTitle(`From r/${random}`)
            .setURL(`https://reddit.com/r/${random}`);

        message.channel.send(embed);
    }
}