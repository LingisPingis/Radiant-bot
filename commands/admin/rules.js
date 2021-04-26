module.exports = {
    name: 'rules',
    description: "sends an embed with all rules",
    async run(client, message, args, Discord) {

        message.delete();
        const colors = require('../../assets/colors.json'); 
        const exampleEmbed = new Discord.MessageEmbed()
            .setColor(colors.blue)
            .setDescription(`
:one: Advertising. Advertising is not permitted in this server, and there is not exception for it. This includes and is not limited to, DM advertising, hinting about the same in general chats in our Discord server, etc.
:two:  Never beg for a staff position. If any staff member abuses their permissions <@!611978487066263582>, <@!568187625534652416> or <@!597470776387436576> must be informed immediately. 
:three: Impersonation. Impersonating anyone in this Discord server such as staff members etc to take advantage of other people to run files etc will not be entertained, even if it is made as a joke. It can end up going past being a joke.
:four: Tagging/Pinging. Do not tag any of the Staff members for no reason, they have other important stuff to do too, so don't waste their time with unnecessary pings.
            `)
            const em2 = new Discord.MessageEmbed()
            .setColor(colors.blue)
            .setDescription(`
:five: Respect everyone. This includes all of our staff members, as well as the members of our server. Everyone deserves to be treated fairly, and anyone found to be mistreating/abusing/berating anyone else will be punished. Any form of racism, sexism, ageism, homophobia or miscellaneous forms of discrimination will not be tolerated.
:seven: Staff. Respect and pay heed to what a Staff member is saying. They're here to help out and moderate the server, and a decision made by them (this goes for any Staff member) is final. If you think they're doing something wrong, please contact a server administrator or higher.
:eight: Alternates. Creation of alternate accounts just to bypass a server punishment, or have a higher chance of winning giveaways will lead to a permanent ban of both the accounts.
:nine: Sensitivity. Do not talk about things that other people may be sensitive towards/might not be comfortable talking about. This includes and is not limited to talking about personal relationships, NSFW content, suicides/deaths, religious/political affairs etc. Jokes are fine, however, toxicity will result in a mute, any further will result in a ban.
            `)
            const em3 = new Discord.MessageEmbed()
            .setColor(colors.blue)
            .setFooter("By sending a message in any channel you agree to follow the rules and accept any punishments")
            .setDescription(`
:one::zero: Tickets, please use tickets for their intended purpose, support and purchases, nothing else.
:one::one: No Doxxing, DDosing, or Dosing is allowed. It is a federal crime and violation of this rule will result in an instant ban along with a possible termination of your Discord account. This includes publishing personal information of other users, sending of Malware, Viruses, Trojans or any other malicious software or links etc.
:one::two: Bypasses. Bypassing any form of punishment given by a Staff member will result in a ban, a staff members decision is final and shouldn't be mistreated.
:one::three: Keep every content/discussion to its corresponding channel, doing otherwise will result in a punishment as decided by a Staff member.
            `)
        if (message.member.hasPermission('ADMINISTRATOR')) {
            message.channel.send(exampleEmbed).catch(err => message.channel.send("I ran into and error!\n\nError: " + err))
            await message.channel.send(em2).catch(_ => _)
            await message.channel.send(em3).catch(_ => _)

        } else message.channel.send('You do not have the sufficient permsissions to run this command!')
    }
}