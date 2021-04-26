module.exports = {
    name: 'use',
    aliases: [],

    async run(client, message, args, Discord, db) {
        
        return message.channel.send("Command disabled for maintenance")
    }
}