module.exports = {
    name: 'verificationhelp',
    aliases: [],
    async run(client, message, args, Discord) {

        const config = client.config
        const colors = client.colors
        const emojis = client.emojis

        const lol2 = new Discord.MessageEmbed()
            .setColor(colors.blue)
            .setAuthor('How can I gain access to the server?')
            .setTitle('1. Make sure your direct messages are turned on.')
            .setDescription(`Please make sure your direct messages are turned on so the bot can send you a message. If they aren\'t, please run the command ${config.prefix}verify in this channnel.`)
            .setImage('https://cdn.discordapp.com/attachments/795042779474034688/807716112242049024/Cap222ture.PNG');
        const lol3 = new Discord.MessageEmbed()
            .setColor(colors.blue)
            .setTitle('2. Enter the captcha code sent by the bot.')
            .setDescription(`The bot will send you a captcha code that you must enter to gain access to the server. This is to protect the server against targeted attacks using automated user accounts.`)
            .setImage('https://cdn.discordapp.com/attachments/820763333703106630/822217170045239346/unknown.png');
        const lol4 = new Discord.MessageEmbed()
            .setColor(colors.blue)
            .setTitle('3. You should now have access to the server!')
            .setDescription(`You should now have access to the server meaning you can get support from us or chat in our general chats with others.`);
        const lol5 = new Discord.MessageEmbed()
            .setColor(colors.blue)
            .setTitle('If for some reason you didn\'t get verified:')
            .setDescription(`Please run the command \`${config.prefix}verify\` in <#822343367203225610> and it should work.\nIf it doesn\'t work after that, please message <@611978487066263582>.`);

            message.channel.send(lol2)
            message.channel.send(lol3)
            message.channel.send(lol4)
            message.channel.send(lol5)
    }
}