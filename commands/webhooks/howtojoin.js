module.exports = {
    name: 'hoasdfrdefgredwtojoin',
    aliases: [],
    async run(client, message, args, Discord) {
        const colors = require('../../colors.json');

        const embed = new Discord.MessageEmbed()
        .setDescription(`
\`\`\`How to join money drops\`\`\`

:exclamation: Add my social club:
**LightyearModz**

<a:b_yes:820773641066774558> If the emoji is green: :green_circle:
We **are** doing a money drop.
<a:b_o:820773834709008395> If the emoji is red: :red_circle:
We are **not** doing a money drop.


*Make sure that you have the <@&819898536245854239> role to get mentioned when a drop is ongoing!*

-In addition, if you reacted you do not need to react again to get the role. 

-If you want to get rid of it simply react again and remove the reaction.
        `)
        .setColor(colors.green)
        try {
            const channel = message.guild.channels.cache.get('819914774446866442')
            const webhooks = await channel.fetchWebhooks();
            const webhook = webhooks.first();

            if (!webhook) {
                channel.createWebhook('Webhook', {
                    avatar: 'https://discord.com/assets/0b7d8392d45f50e895f03eb2c1e2fb6c.svg',
                })
                message.channel.send("I couldnt find a webhook to use to send anything! Therefor i made one, please run the command again to send it.")
            }

            webhook.send(`https://cdn.discordapp.com/attachments/825144853402222622/825144919336681492/howtojoin.png`, {
                username: 'How To Join',
                avatarURL: 'https://cdn.discordapp.com/icons/819888633704087552/a_558d9bd43aa05a1e5d5cea5aa7a6416f.gif',
                })
            await webhook.send({
                username: 'How To Join',
                avatarURL: 'https://cdn.discordapp.com/icons/819888633704087552/a_558d9bd43aa05a1e5d5cea5aa7a6416f.gif',
                embeds: [embed]
            })
            await webhook.send("** If you reacted before you do not need to react again, you still keep the role. If you want to remove your role and you dont see your reaction, simply react and unreact.**", {
                username: 'How To Join',
                avatarURL: 'https://cdn.discordapp.com/icons/819888633704087552/a_558d9bd43aa05a1e5d5cea5aa7a6416f.gif'
            })
            message.react('👌');
        } catch (error) {
            console.error('Error trying to send: ', error);
        }
    }
}