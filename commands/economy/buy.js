module.exports = {
    name: 'buy',
    aliases: [],

    async run(client, message, args, Discord, db) {

        return message.channel.send("Command disabled for maintenance")
    }
}