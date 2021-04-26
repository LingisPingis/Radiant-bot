module.exports = (client, message, args, Discord, db) => {

    if(!args[1]) return message.channel.send("Please provide a valid prefix!")
    let prefix = args[1]
    db.set(`prefix`, prefix)
    message.channel.send("ok! My new prefix is `" + prefix + "`")
}