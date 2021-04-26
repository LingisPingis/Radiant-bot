module.exports = {
    name: 'rank',
    aliases: ["level"],

    async run(client, message, args, Discord, db) {

        const canvacord = require("canvacord");
        const img = message.author.displayAvatarURL().replace(".webp", ".png")

        user = message.author
        let xp = db.get(`userdata_${message.author.id}.levels.xp`);
        console.log(xp)
        let level = db.get(`userdata_${message.author.id}.levels.level`)

        let b
        let a = level + 1
        b = db.get(`level${a}`, b)

        const rank = new canvacord.Rank()
            .setAvatar(img)
            .setCurrentXP(xp)
            .setLevel(level + 1)
            .setRequiredXP(b)
            .setStatus(user.presence.status)
            .setProgressBar(["#FFFFFF", "#FFCC33"], "GRADIENT")
            .setUsername(user.username)
            .setDiscriminator(user.discriminator);

        rank.build()
            .then(data => {
                const attachment = new Discord.MessageAttachment(data, "RankCard.png");
                message.channel.send(attachment);
            });
    }
}