// Packages
const Discord = require('discord.js'); // For Embed
const botInfo = require('../../package.json')
const { Client, Message } = require('discord.js');
/**
 * @param {Client} client - Discord.js Client
 * @param {Message} message - Discord.js Message
 */

module.exports = {
    name: 'botinfo',
    aliases: ["bot-info"],
    async run(client, message, args) {

        const { mem, cpu, os } = require('node-os-utils');
        const { totalMemMb, usedMemMb, freeMemMb } = await mem.info();

        const { parseDur } = require('../../assets/functions');
        const uptime = parseDur(client.uptime);

        const config = client.config

        const clientembed = new Discord.MessageEmbed()
            .setColor('BLUE')
            .setTimestamp(message.createdAt)
            .addFields(
                { name: "Development version", value: "V2.4", inline: false },
                { name: "Developer", value: `Lingen#2230`, inline: false },
                { name: "Website", value: `[Radiant Cheats](<https://radiantcheats.net/>)`, inline: true },
                { name: "Dashboard", value: `[SoonTM](<https://localhost:8080>)`, inline: true },
                { name: "\u200b", value: `\u200b`, inline: true },
                { name: "Node.js version: ", value: process.version, inline: true },
                { name: "Discord.js version: ", value: botInfo.dependencies['discord.js'].replace('^', 'V'), inline: true },
                { name: "Current Uptime: ", value: `${uptime}`, inline: true },
                { name: "\u200b", value: "```System Specifications```\n", inline: false },
                { name: "CPU Model", value: `${cpu.model()}`, inline: true },
                { name: 'CPU Cores', value: `${cpu.count()}`, inline: true },
                { name: 'CPU Usage', value: `${await cpu.usage()}%`, inline: true },
                { name: 'RAM Total', value: `${totalMemMb}MB`, inline: true },
                { name: 'RAM Free', value: `${freeMemMb}MB`, inline: true },
                { name: 'RAM Usage', value: `${usedMemMb}MB`, inline: true },
            )
        message.channel.send(clientembed)
    }
}