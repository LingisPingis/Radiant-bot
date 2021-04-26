const randomPuppy = require('random-puppy');
const request = require('node-fetch');
const fs = require("fs")

const Discord = require('discord.js');
const booru = require('booru');

module.exports = {
    name: "r34",
    category: "NSFW",
    description: "Searches rule34",
    aliases: ["rule34"], 
    
    async run (client, message, args){
        //command

        //Checks channel for nsfw
        var errMessage = "This is not an NSFW Channel";
        if (!message.channel.nsfw) {
            message.react('💢');

            return message.reply(errMessage)
                .then(msg => {
                    msg.delete({ timeout: 10000 })
                    message.delete({ timeout: 10000 })
                })

        }

        if (message.content.toUpperCase().includes('GORE')) return message.channel.send('Gore isn\'t allowed, not even in NSFW channels!');

        var query = message.content.split(/\s+/g).slice(1).join(" ");
        booru.search('rule34', [query], { nsfw: true, limit: 1, random: true })
            .then(booru.commonfy)
            .then(images => {
                for (let image of images) {
                    const embed = new Discord.MessageEmbed()
                        .setImage(image.common.file_url)
                        .setColor('#2F3136')
                        .setFooter(`Tags: r34 ${query}`)
                    return message.channel.send({ embed });
                }

            }).catch(err => {
                if (err.name === 'booruError') {
                    return message.channel.send(`No results found for **${query}**!`);
                } else {
                    return message.channel.send(`No results found for **${query}**!`);
                }
            })
    }
};