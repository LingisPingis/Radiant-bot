module.exports = (client, message, args, Discord, db) => {

    if(!args[1]) return message.channel.send("Please provide a valid channel id!")
    let buyerReq = args[1]
    db.set(`buyerChannel_${message.guild.id}`, buyerReq)
    message.channel.send(`ok! I will send buyer requests to <#${args[1]}>!`)
}