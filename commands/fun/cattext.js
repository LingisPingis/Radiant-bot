const client = require('nekos.life');
const Discord = require('discord.js');
const neko = new client();


module.exports = {
    name: "cattext",
    description: "sends owo nya cute anime waifu text stuff",
    run (client, message, args, Discord) {
        //command

        async function work() {

            let owo = (await neko.sfw.catText());
            message.channel.send(owo.cat).catch(error => {
                console.error(error);
            });

        }

        work();
    }
};