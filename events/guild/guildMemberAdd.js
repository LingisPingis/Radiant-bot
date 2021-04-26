module.exports = async (Discord, client, member) => {
    const colors = require('../../assets/colors.json');
    const emojis = require('../../assets/emojis.json');
    const config = require('../../assets/config.json');
    const createCaptcha = require('../../assets/captchaStuff/captcha.js');
    const fs = require('fs')
    const guild = client.guilds.cache.get(client.config.serverID);
    const moment = require('moment')
    const db = require('quick.db')
    let prefix;
    prefix = db.get(`prefix`, prefix)
    // welcome client.config

    let stats = {
        serverID: config.serverID,
    }

    let membeer = 'a'
    membeer = db.get(`memberCounter_${member.guild.id}`, membeer)

    if (membeer) {
        if (member.guild.id !== stats.serverID) return;
        //    client.channels.cache.get(stats.total).setName(`Total Users: ${member.guild.memberCount}`);
        client.channels.cache.get(membeer).setName(`👥 Members: ${member.guild.members.cache.size}`);
        //client.channels.cache.get(stats.bots).setName(`Bots: ${member.guild.members.cache.filter(m => m.user.bot).size}`);
    }

    // logging the join
    const embedAbc = new Discord.MessageEmbed()
        .setAuthor(member.user.tag, member.user.displayAvatarURL({ dynamic: true }))
        .setTitle("Member Joined")
        .setColor(colors.green)
        .setDescription(`<@!${member.id}> just joined!` + "\n" + emojis.calendar + " " + `Account Created On \`${moment(member.user.createdAt).format('MMM DD YYYY')}\``)
        .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
        .setFooter("ID: " + member.id)

    const addLog = member.guild.channels.cache.get(config.logs)
    if (addLog) {
        addLog.send(embedAbc).catch(err => console.log(err))
    }
    // if the auto role module is enabled, it will give them the auto role

    let autoRole = 'a'
    if (db.get(`autoRole`, autoRole)) {
        autoRole = db.get(`autoRole`, autoRole)
        // giving the role
        let role = member.guild.roles.cache.get(autoRole)
        member.roles.add(role)
    }

    // if the captcha module is enabled
    if (db.get(`Captcha_${member.guild.id}`, true)) {

        // sending the captcha
        const captcha = await createCaptcha();
        try {
            const msg = await member.send({
                embed: {
                    title: `Welcome to **${member.guild.name}**!`,
                    description: `Please make sure to read the rules, they can be found in <#832872434280562692> once you have verified, and have a great time here in **${guild.name}**!\n\n**To gain access to the server** please enter captcha below.\n(**NOTE:** The captcha is case-sensitive)`,
                    image: {
                        url: `attachment://${captcha}.png`
                    },
                    color: `${colors.blue}`
                },
                files: [{
                    attachment: `${__dirname}/../../assets/captchaStuff/captchas/${captcha}.png`,
                    name: `${captcha}.png`
                }]
            });
            try {
                const filter = m => {
                    if (m.author.bot) return;
                    if (m.author.id === member.id && m.content === captcha) return true;
                    else {
                        m.channel.send({
                            embed: {
                                title: 'Captcha failed!',
                                description: 'That isn\'t quiet right! Please try again.',
                                color: `${colors.red}`
                            }
                        });
                        const captchaWrong = new Discord.MessageEmbed()
                            .setColor(colors.red)
                            .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
                            .setTitle("Captcha Failed")
                            .addField("Member", m.author.tag, true)
                            .addField("Provided", m.content, true)
                            .addField("Expected", captcha, true)
                        const addLog = member.guild.channels.cache.get(client.config.logs)
                        if (addLog) {
                            addLog.send(captchaWrong)
                        }
                        return false;
                    }
                };
                let dbTime = 'a'
                if (!db.get(`dbTime_${member.guild.id}`, dbTime)) {
                    dbTime = 120000 // 2 min, 120 seconds, 120000 ms
                } else {
                    dbTime = db.get(`dbTime_${member.guild.id}`, dbTime)
                }
                const response = await msg.channel.awaitMessages(filter, { max: 1, time: dbTime, errors: ['time'] });
                if (response) {
                    await msg.channel.send({
                        embed: {
                            title: 'Thank you for verifying!',
                            description: 'Thank you for completing this captcha, you now have access to the server!',
                            color: `${colors.blue}`
                        }
                    })
                    const captchaRight = new Discord.MessageEmbed()
                        .setColor(colors.green)
                        .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
                        .setTitle("User completed the captcha")
                        .setDescription("<@" + member.id + ">" + " completed the captcha! \nCaptcha: `" + captcha + "`")
                    const addLog = member.guild.channels.cache.get(client.config.logs)
                    if (addLog) {
                        addLog.send(captchaRight)
                    }
                    let verifiedRole = 'a'
                    if (!db.get(`verifiedRole_${member.guild.id}`, verifiedRole)) {
                        return
                    } else {
                        let verifiedRole = 'a'
                        verifiedRole = db.get(`verifiedRole_${member.guild.id}`, verifiedRole)
                        // giving the role
                        await member.roles.add(verifiedRole);

                    }

                    await fs.unlink(`${__dirname}/../../assets/captchaStuff/captchas/${captcha}.png`, function (err) {
                        if (err) throw err;
                        // if no error, file has been deleted successfully
                    })
                }
            }
            catch (err) {
                console.log(err);
                await msg.channel.send({
                    embed: {
                        title: 'Captcha failed!',
                        description: `Looks like you didn\'t complete the captcha in time, to retry please run the command ${prefix}verify in the verification channel.`,
                        color: `${colors.red}`
                    }
                }).catch(err => err)

                await fs.unlink(`${__dirname}/../../captchaStuff/captchas/${captcha}.png`, function (err) {
                    if (err) throw err;
                    // if no error, file has been deleted successfully
                    console.log(captcha + " deleted successfully")
                })

                const captchaOutOfTime = new Discord.MessageEmbed()
                    .setTitle("User didn't complete the captcha in time")
                    .setDescription("<@" + member.id + ">" + " did not complete the captcha in time.\nCaptcha: `" + captcha + "`")
                    .setColor(colors.red)
                    .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
                if (addLog) {
                    addLog.send(captchaOutOfTime)
                }
            }
        } catch (err) {
            console.log(err);
        }
    }
}