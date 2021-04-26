module.exports = (client, message, args, Discord, db) => {

    if (!args[1]) return message.channel.send("Please provide a valid state! `on` or `off` or `role`")
    if (args[1] === 'off') {
        db.delete(`Captcha_${message.guild.id}`, true);
        return message.channel.send("ok! I will no longer send people captchas.")
    }
    if (args[1] === 'on') {
        db.set(`Captcha_${message.guild.id}`, true)
        return message.channel.send("ok! I will people who join captchas.")
    }
    if (args[1] === 'role') {
        if (!args[2]) return message.channel.send("Please specify a valid role id!")
        if (args[2] === 'off') {
            let verifiedRole = 'a'
            db.delete(`verifiedRole_${message.guild.id}`, verifiedRole)
            return message.channel.send("ok! I will no longer assign any verified role.")
        }

        let verifiedRole = args[2];
        db.set(`verifiedRole_${message.guild.id}`, verifiedRole)
        message.channel.send(`ok! I set the verified role to <@&${verifiedRole}>`)
    }
    if (args[1] === 'time') {
        if(args[2] === 'off') return message.channel.send("I cannot disable this feature as it is not its own module, to disable this please disable the captcha module.")
        if (!args[2]) return message.channel.send("Please provide a valid time in seconds formatted like this\n<{prefix}settings captcha time 120> (120 seconds)\n**NOTE** Decimal numbers do not work.")
        if (message.content.includes(".") || message.content.includes(",")) return message.channel.send("Please dont give me a decimal number! your time should be formatted like this:\n<{prefix}settings captcha time 120> (120 seconds)")
        
        let dbTime = args[2] * 1000
        db.set(`dbTime_${message.guild.id}`, dbTime)
        dbTime = dbTime / 1000
        return message.channel.send(`ok! The captcha timeout is now \`${dbTime}\` seconds!`)
    }
}