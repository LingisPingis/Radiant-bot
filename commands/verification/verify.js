module.exports = {
    name: 'verify',
    aliases: [],

    async run(client, message, args, Discord, db) {

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
                }).catch(err => message.channel.send(new Discord.MessageEmbed().setTitle("Error").setDescription("I could not dm you, please enable your direct messages from this server then try again!").setColor(client.colors.red)))
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
}