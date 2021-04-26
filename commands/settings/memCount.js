module.exports = (client, message, args, Discord, db) => {

    if(!args[1]) return message.channel.send("Please provide a valid channel for me to count members on.")    
    if(args[1] === 'off') {

        let memCount = 'a'
        db.delete(`memberCounter_${message.guild.id}`, memCount)
        return message.channel.send("ok! I will not count any members.")
    }
    if(args[1]) {

        let memCount = args[1];
        db.set(`memberCounter_${message.guild.id}`, memCount)
        message.channel.send(`ok! I will count members on <#${memCount}>`)
    }
}