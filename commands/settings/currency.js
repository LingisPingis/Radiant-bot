module.exports = (client, message, args, Discord, db) => {

    if(!args[1]) return message.channel.send("Please provide a currency for me to use!")

    if(args[1]) {
        db.set(`currency`, args[1])
        message.channel.send(`Successfully set the currency to \`${args[1]}\``)
    }
}