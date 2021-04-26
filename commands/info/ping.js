module.exports = {
    name: 'ping',
    description: "this is a ping cmd",
    run(client, message, args, Discord) {
        const embed = new Discord.MessageEmbed()
            .setTitle(':ping_pong: Pong!')
            .setColor('BLUE')
            .setDescription(`Latency: **${Date.now() - message.createdTimestamp}**ms. 
            API Latency: **${Math.round(client.ws.ping)}**ms`);

        message.channel.send(embed)
    }
}