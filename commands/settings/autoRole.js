module.exports = (client, message, args, Discord, db) => {

    if (args[1] === 'off') {
        let autoRole = 'a'
        db.delete(`autoRole`, autoRole)
        return message.channel.send("ok! I won't automatically give people roles on join.")
    }
    if (args[1]) {
        let autoRole = args[1];
        db.set(`autoRole`, autoRole)
        return message.channel.send(`ok! I will now give the people that join the <@&${autoRole}> role!`)
    }
}