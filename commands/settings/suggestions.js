module.exports = (client, message, args, Discord, db) => {

            if (!args[1]) return message.channel.send("Please provide a valid channel for me to react to messages to!")
            if (args[1] === 'off') {
                let suggestions = 'a'
                db.delete(`suggestions_${message.guild.id}`, suggestions)
                message.channel.send("ok! I will no longer react to suggestions.")
                return
            }
            if (args[1]) {
                let suggestions = args[1];

                db.set(`suggestions_${message.guild.id}`, suggestions)
                message.channel.send(`ok! I will react to messages in <#${suggestions}>!`)
            }

}