const client = require('nekos.life');
const Discord = require('discord.js')
const neko = new client();

module.exports = {
    name: "trap",
    category: "NSFW",
    usage: "[command]",
    async run(client, message, args) {
        //command

        //Checks channel for nsfw
        var errMessage = "This is not an NSFW Channel";
        if (!message.channel.nsfw) {
            message.react('💢');

            return message.reply(errMessage)
                .then(msg => {
                    msg.delete({ timeout: 3000 })
                    message.delete({ timeout: 3000 })
                })

        }

        async function work() {
            let owo = (await neko.nsfw.trap());

            const trap = new Discord.MessageEmbed()
                .setImage(owo.url)
                .setColor(`#2F3136`)
            message.channel.send(trap);

        }

        work();
    }
};