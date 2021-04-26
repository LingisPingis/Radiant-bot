const Discord = require('discord.js')
module.exports = {
    name: 'nuke',
    description: "nukes a channel",
    aliases: ['bomb'],

    async run (client, message, args) {

        const colors = client.colors
        const emojis = require('../../assets/emojis.json')

        const embedOne = new Discord.MessageEmbed()
        .setColor(colors.red)
        .setDescription(emojis.Fail + ' You dont have the sufficient permissions to run this command!');

        if (message.member.permissions.has('MANAGE_CHANNELS')) {

            let newchannel = await message.channel.clone().catch(err => console.log(err));

            await message.channel.delete().catch(err => console.log(err));

            let embed = new Discord.MessageEmbed()
                .setTitle("Channel Nuked!")
                .setImage("https://images-ext-2.discordapp.net/external/U5Ch5xJVuUMhDLKGC4096BfpC7NLBRu_KDVU4g0xLz4/%3Fitemid%3D4464831/https/media1.tenor.com/images/2e50750a1356ee2cf828090cbb864634/tenor.gif")
            await newchannel.send(embed)
            
        } else message.channel.send(embedOne)
    }
}