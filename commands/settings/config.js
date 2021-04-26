module.exports = (client, message, args, Discord, db) => {

    let prefix = 'a';
    prefix = db.get(`prefix`, prefix);
    let welcomeChannel = 'a'
    welcomeChannel = db.get(`welcomeChannel_${message.guild.id}`, welcomeChannel)
    let buyerChannel = 'a'
    buyerChannel = db.get(`buyerChannel_${message.guild.id}`, buyerChannel)
    let invDelete = 'a'
    invDelete = db.get(`invDelete_${message.guild.id}`, true)
    let suggestions = 'a'
    suggestions = db.get(`suggestions_${message.guild.id}`, suggestions)
    let modLogs = 'a'
    modLogs = db.get(`modLogs_${message.guild.id}`, modLogs)
    let buyerrole = 'a'
    buyerrole = db.get(`buyerrole`, buyerrole)
    let Captcha = 'a'
    Captcha = db.get(`Captcha_${message.guild.id}`, true)
    let verifiedRole = 'a'
    verifiedRole = db.get(`verifiedRole_${message.guild.id}`, verifiedRole)
    let memberCounter = 'a'
    memberCounter = db.get(`memberCounter_${message.guild.id}`, memberCounter)
    let modDelete = 'a'
    modDelete = db.get(`modDelete_${message.guild.id}`, modDelete)
    let boostCounter = 'a'
    boostCounter = db.get(`boostCounter_${message.guild.id}`, boostCounter)
    let logs = 'a'
    logs = db.get(`logs_${message.guild.id}`, logs)
    let autoRole = 'a'
    autoRole = db.get(`autoRole`, autoRole)
    let dbTime = 'a'
    dbTime = db.get(`dbTime_${message.guild.id}`, dbTime) / 1000
    let currency = 'a'
    currency = db.get(`currency`, currency)

    const embed = new Discord.MessageEmbed()
        .setTitle(`${client.user.username}'s Settings`)
        .addField("Prefix", `${prefix}`)
        .addField("Welcome Messages", `<#${welcomeChannel}>`.replace("<#null>", "Disabled"))
        .addField("Buyer Requests", `<#${buyerChannel}>`.replace("<#null>", "Disabled"))
        .addField("Delete Invites", `${invDelete}`.replace("false", "Disabled").replace("true", "Enabled").replace("null", "Disabled"))
        .addField("Suggestions", `<#${suggestions}>`.replace("<#null>", "Disabled"))
        .addField("Logs", `<#${logs}>`.replace("<#null>", "Disabled"))
        .addField("Moderation Logs", `<#${modLogs}>`.replace("<#null>", "Disabled"))
        .addField("Captcha Verification", `${Captcha}\n<@&${verifiedRole}>\n${dbTime}s`.replace("<@&null>", "None").replace("false", "Disabled").replace("true", "Enabled").replace("null", "Disabled").replace("null", "None"))
        .addField("Auto Role", `<@&${autoRole}>`.replace("<@&null>", "Disabled"))
        .addField("Buyer Role", `<@&${buyerrole}>`.replace("<@&null>", "Disabled"))
        .addField("Member Counter", `<#${memberCounter}>`.replace("<#null>", "Disabled"))
        //.addField("Boost Counter", `<#${boostCounter}>`.replace("<#null>", "Disabled"))
        .addField("Delete Mod Commands", `${modDelete}`.replace("null", "Disabled"))
        .addField("Economy Currency", `${currency}`.replace("null", "$"))

    message.channel.send(embed)
}