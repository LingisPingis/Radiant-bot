module.exports = {
    name: 'welcomewdhtrhgfdtrsebhook',
    aliases: [],
    async run(client, message, args, Discord) {
        const colors = require('../../colors.json');

        const embed = new Discord.MessageEmbed()
            .setDescription(`
            \`\`\`[INTRODUCTION]\`\`\`

:wave: Welcome to the Official Lightyear's Mods Discord server!
Check back regularly since the rules might change overtime. We wish you a pleasant stay!

\`\`\`[RULES]\`\`\`

<:Peperules:820783508204552212>
**1)** Use correct channels specific to your needs.
**2)** Respect staff and their decision about your problem.
**3)** Do not post/link any malicious content.
**4)** Do not post advertisements or other promotional content.
**5)** Spamming, name calling, excessively @‘ing, harassing or threatening other people will not be tolerated.
**6)** Impersonating other people or Staff is not allowed.
**7)** Staff reserves the right to kick or ban a person if they feel it is necessary.
**8)** No NSFW content is allowed, this includes but is not limited to posts, profile pictures etc.
**9)** Talking about mod menu’s and modding services of any kind other then ours is not allowed.
**10) Every member has to be 13 years of age due to the ToS of Discord.**

\`\`\`[LINKS]\`\`\`

<:Discord:821426212458070066> Discord invite link:
https://discord.gg/lightyearsmods
<:rockstar:821426279017873408> Rockstar Crew:
https://socialclub.rockstargames.com/crew/lightyears_mods/wall
<:instagram:821426309892538419> Instagram page:
https://www.instagram.com/lightyearsmods/

\`\`\`[CONTACT]\`\`\`

:e_mail: **contact@lightyearsmods.com**
:incoming_envelope: DM any <@&820977137007591514> or <@&819898322180898827> if it's urgent.
`)
            .setColor(colors.purple)
        try {
            const channel = message.guild.channels.cache.get('819913883828879361')
            const webhooks = await channel.fetchWebhooks();
            const webhook = webhooks.first();

            if (!webhook) {
                channel.createWebhook('Webhook', {
                    avatar: 'https://discord.com/assets/0b7d8392d45f50e895f03eb2c1e2fb6c.svg',
                })
                message.channel.send("I couldnt find a webhook to use to send anything! Therefor i made one, please run the command again to send it.")
            }
            
                        webhook.send(`https://cdn.discordapp.com/attachments/825144853402222622/825144923241709628/welcome.png`, {
                            username: 'Welcome to Lightyear\'s Mods!',
                            avatarURL: 'https://cdn.discordapp.com/icons/819888633704087552/a_558d9bd43aa05a1e5d5cea5aa7a6416f.gif',
                            })
            await webhook.send({
                username: 'Welcome to Lightyear\'s Mods!',
                avatarURL: 'https://cdn.discordapp.com/icons/819888633704087552/a_558d9bd43aa05a1e5d5cea5aa7a6416f.gif',
                embeds: [embed]
            })/*
            await webhook.send("**extra text here**", {
                username: 'Welcome to lightyear\'s mods!',
                avatarURL: 'https://cdn.discordapp.com/icons/819888633704087552/a_558d9bd43aa05a1e5d5cea5aa7a6416f.gif'
            })*/
            message.react('👌');
        } catch (error) {
            console.error('Error trying to send: ', error);
        }
    }
}