module.exports = (client, message, args, Discord, db) => {

    if (!args[1]) return message.channel.send("Please provide a valid second argument like `on` or `off`")
    if (args[1] === 'on') {
        db.set(`invDelete_${message.guild.id}`, true)
        message.channel.send("ok! I will now delete any server invites.")
    } else if (args[1] === 'off') {
        db.set(`invDelete_${message.guild.id}`, false)
        message.channel.send("ok! I will no longer delete any server invites.")
    }
}