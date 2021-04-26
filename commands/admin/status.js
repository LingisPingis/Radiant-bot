const { red } = require("chalk")

module.exports = {
    name: 'status',
    run (client, message, args, Discord) {

        if(!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send("How about no?")

        if (args[0] === "listening" || args[0] === "Listening") {
            types = 2
        } else if (args[0] === "streaming" || args[0] === "Streaming") {
            types = 1
        } else if (args[0] === "playing" || args[0] === "Playing") {
            types = 0
        } else if (args[0] === "watching" || args[0] === 'Watching') {
            types = 3
        } else {

            let invalid = new Discord.MessageEmbed()

                .setTitle('Looks like something went wrong!')
                .setDescription('Please provide a valid second argument such as: \`Listening, Streaming, Watching or Playing\`!')
                .setColor('#F32332')

            return message.channel.send(invalid)

        }

        args.shift()
        content = args.join(' ')
        client.user.setPresence({
            activity: {
                name: content,
                type: types
            }
        })

        if (types === 0) {
            types = 'Playing'

        } else if (types === 1) {
            types = 'Streaming'

        } else if (types === 2) {
            types = 'Listening to'

        } else if (types === 3) {
            types = 'Watching'

        }

        let embed = new Discord.MessageEmbed()
            .setTitle('Success!')
            .setDescription(`My status has been set to: \`${types} ${content}\``)
            .setColor('#4DFF4D')

        message.channel.send(embed)
    }
}