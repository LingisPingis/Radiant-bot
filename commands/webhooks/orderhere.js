module.exports = {
    name: 'ordvchbtfgrgferhere',
    aliases: [],
    async run(client, message, args, Discord) {
        const colors = require('../../colors.json');

        const embed = new Discord.MessageEmbed()
            .setDescription(`\`\`\`[Order here]\`\`\`
:link: \`\`Shop link\`\`
https://shoppy.gg/@lightyearsmods

:money_with_wings: \`\`Recovery packages\`\`
<:levelbronze3:824744011805098034>**Super: (€10)**
500 Million GTAO$
1-250 Rank
<:levelsilver3:824744130194047056>**Ultra: (€20)**
2 Billion GTAO$
1-500 Rank
Full stats
All unlocks
<:levelgold3:824744103207108648>**Ultimate: (€25)**
20 Billion GTAO$
1-8000 rank
Full stats
All unlocks
All bunker research

:key: \`\`Modded Accounts\`\`
Email of your choice
Pre-modded
**Fully accessible** for lifetime
€30 for a GTAV license+ ultra pack. 
€40 for a GTAV license+ ultimate pack.

:question: \`\`How to order\`\`
**Please read before opening a ticket:**
Payment methods: paypal, stripe, steam giftcard or tikkie.
Make a ticket when you completed your payment.
*Want to pay through tikkie or steam giftcard? open a ticket.*

*Modding your account is always at your own risk!*`)
            .setColor(colors.green)
        try {
            const channel = message.guild.channels.cache.get('819916052862861342')
            const webhooks = await channel.fetchWebhooks();
            const webhook = webhooks.first();

            if (!webhook) {
                channel.createWebhook('Webhook', {
                    avatar: 'https://discord.com/assets/0b7d8392d45f50e895f03eb2c1e2fb6c.svg',
                })
                message.channel.send("I couldnt find a webhook to use to send anything! Therefor i made one, please run the command again to send it.")
            }
            
                webhook.send(`https://cdn.discordapp.com/attachments/819919023437381673/825144739221078076/orderhere.png`, {
            username: 'Order Here',
            avatarURL: 'https://cdn.discordapp.com/icons/819888633704087552/a_558d9bd43aa05a1e5d5cea5aa7a6416f.gif',
            })
            await webhook.send({
                username: 'Order Here',
                avatarURL: 'https://cdn.discordapp.com/icons/819888633704087552/a_558d9bd43aa05a1e5d5cea5aa7a6416f.gif',
                embeds: [embed]
            })
            message.react('👌');
        } catch (error) {
            console.error('Error trying to send: ', error);
        }
    }
}