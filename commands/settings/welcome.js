module.exports = (client, message, args, Discord, db) => {
    
    if (!args[1]) return message.channel.send("Please provide a valid channel for me to send welcome messages to!")
    if (args[1] === 'off') {
        let welcomeChannel = 'a'
        db.delete(`welcomeChannel_${message.guild.id}`, welcomeChannel)
        return message.channel.send("ok! I wont send any welcome messages.")
    }
    if(args[1] === 'on') {
        let welcome = args[1];

        db.set(`welcomeChannel_${message.guild.id}`, welcome)
        message.channel.send(`ok! I will send welcome messages to <#${welcome}>!`)
    }
    if (args[1]) {
        let welcome = args[1];

        db.set(`welcomeChannel_${message.guild.id}`, welcome)
        message.channel.send(`ok! I will send welcome messages to <#${welcome}>!`)
    }
}