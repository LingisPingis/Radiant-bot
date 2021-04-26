const canva = require('canvacord');
const Discord = require('discord.js');

module.exports = {
    name: "aaaaaaaaaaaaaaaaaaaaaaa",
    description: "Trigegr yourself",


    async run (client, message, args, Discord) {

        let colorOfChoice = args.join(" ");

        if(!args[0]) return message.channel.send('Provide a valid hex code (#FF0000)');

        let image = await canva.color(`#${colorOfChoice}`)

        let color = new Discord.MessageAttachment(image, "color.png")

        message.channel.send(color);
    }
}