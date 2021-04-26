module.exports = (client, message, args, Discord, db) => {

    if(!args[1]) return message.channel.send("Please provide a channel id for me to count boosts on! text channel or voice channel, both work.")
    if(args[1] === 'off') {
        let boosts = 'a'
        db.delete(`boostCounter_${message.guild.id}`, boosts)
        return message.channel.send("ok! I will no longer count boosts.")
    }
    if(args[1]) {
        let counter = args[1];

        db.set(`boostCounter_${message.guild.id}`, counter)
        message.channel.send(`ok! I will now count boosts on <#${counter}>`)
    }
}