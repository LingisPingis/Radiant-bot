module.exports = (client, message, args, Discord) => {

    const db = require('quick.db');
    let modLogs = 'a'

    if(!args[1]) return message.channel.send("Please provide a valid channel for me to send mod logs to!")
    if(args[1] === 'off') {
        db.delete(`modLogs_${message.guild.id}`, modLogs)
        message.channel.send("ok! I will no longer send moderation logs.")
    }
    if (args[1]) {
        modLogs = args[1];
        db.set(`modLogs_${message.guild.id}`, modLogs)
        message.channel.send("ok! I will send moderation logs to " + "<#" + modLogs + ">").catch(err => err)
    }
}