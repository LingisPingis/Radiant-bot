module.exports = {
    name: 'exfdgtrhampkr',
    aliases: [],
    async run(client, message, args, Discord) {
        const colors = require('../../colors.json');

        const embed = new Discord.MessageEmbed()
            .setDescription(`
\`\`\`title\`\`\`
text here
`)
            .setColor(colors.green)
        try {
            const channel = message.guild.channels.cache.get('channel id here')
            const webhooks = await channel.fetchWebhooks();
            const webhook = webhooks.first();

            if (!webhook) {
                channel.createWebhook('Webhook', {
                    avatar: 'https://discord.com/assets/0b7d8392d45f50e895f03eb2c1e2fb6c.svg',
                })
                message.channel.send("I couldnt find a webhook to use to send anything! Therefor i made one, please run the command again to send it.")
            }
            /*
                        webhook.send(`https://cdn.discordapp.com/attachments/819914774446866442/820043160251662377/howtojoin.png`, {
                            username: 'How To Join',
                            avatarURL: 'https://cdn.discordapp.com/icons/819888633704087552/a_558d9bd43aa05a1e5d5cea5aa7a6416f.gif',
                            })*/
            await webhook.send({
                username: 'How To Join',
                avatarURL: 'https://cdn.discordapp.com/icons/819888633704087552/a_558d9bd43aa05a1e5d5cea5aa7a6416f.gif',
                embeds: [embed]
            })
            await webhook.send("**extra text here**", {
                username: 'How To Join',
                avatarURL: 'https://cdn.discordapp.com/icons/819888633704087552/a_558d9bd43aa05a1e5d5cea5aa7a6416f.gif'
            })
            message.react('👌');
        } catch (error) {
            console.error('Error trying to send: ', error);
        }
    }
}