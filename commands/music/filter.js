const Discord = require('discord.js');
const embed = new Discord.MessageEmbed()
.setColor('BLUE')
const embed2 = new Discord.MessageEmbed()
.setColor('BLUE')
.setDescription(`:notes: - I'm **disabling** the filter on the music, please wait... Note: the longer the music is playing, the longer this will take.`)
module.exports = {
    name: 'filter',
    aliases: [],
    category: 'Music',
    utilisation: '{prefix}filter [filter name]',

    run (client, message, args, Discord) {

        const config = client.config
        const emojis = client.emojis

        embed.setDescription(':warning: Only staff members can execute this command!')
        embed.setColor('#C70000')
        
        if(!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send(embed)

        embed.setDescription(`${emojis.fail} - You're not in a voice channel !`)
            if (!message.member.voice.channel) return message.channel.send(embed);

            embed.setDescription(`${emojis.fail} - You are not in the same voice channel as me!`)
            if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(embed);

            embed.setDescription(`${emojis.fail} - No music is currently playing!`)
            if (!client.player.getQueue(message)) return message.channel.send(embed);

            embed.setDescription(`${emojis.fail} - Please specify a valid filter to enable or disable!`)
            if (!args[0]) return message.channel.send(embed);

            const filterToUpdate = client.filters.find((x) => x.toLowerCase() === args[0].toLowerCase());

            embed.setDescription(`${emojis.fail} - This filter doesn't exist, try for example (8D, vibrato, pulsator...) !`)
            if (!filterToUpdate) return message.channel.send(embed);

            const filtersUpdated = {};

            filtersUpdated[filterToUpdate] = client.player.getQueue(message).filters[filterToUpdate] ? false : true;

            client.player.setFilters(message, filtersUpdated);

            embed.setDescription(`:notes: - I'm **adding** the filter to the music, please wait... Note: the longer the music is, the longer this will take.`)
            embed.setColor('BLUE')
            if (filtersUpdated[filterToUpdate]) message.channel.send(embed);

            else message.channel.send(embed2);
    },
};