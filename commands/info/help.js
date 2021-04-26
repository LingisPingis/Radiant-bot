const Discord = require(`discord.js`);
const db = require('quick.db');

module.exports = {
    name: `help`,
    description: "lmao",
    run(client, message, args) {

        const colors = client.colors
        const emojis = require('../../assets/emojis.json')

/*********************For new stuff**********************
 *                                                      *
 *  { name: `\`${prefix}\``, value: ``, inline: true }, *
 *                                                      *
 ********************************************************/

        let a;
        let prefix = db.get(`prefix`, a) //You have to define prefix inside the run event

        const embed = new Discord.MessageEmbed()
            .setThumbnail(client.user.displayAvatarURL())
            .setAuthor(client.user.username, client.user.displayAvatarURL())
            .setColor(colors.red)
            .setTimestamp()
            .setDescription(`Invalid sub-menu, please use the command ${prefix}help for a list of valid sub-menus.`)

        if (!args[0]) {

            embed.setColor(colors.purple)
            embed.setDescription(`\n`)
            embed.addFields(
                { name: `${emojis.economy} Economy`, value: `\`${prefix}help economy\``, inline: true },
                { name: `${emojis.fun} Fun`, value: `\`${prefix}help fun\``, inline: true },
                { name: `${emojis.giveaway} Giveaways`, value: `\`${prefix}help giveaways\``, inline: true },
                { name: `${emojis.info} Info`, value: `\`${prefix}help info\``, inline: true },
                { name: `${emojis.staff} Staff`, value: `\`${prefix}help staff\``, inline: true },
                { name: `${emojis.music} Music`, value: `\`${prefix}help music\``, inline: true },
                { name: `${emojis.nsfw} nsfw`, value: `\`${prefix}help nsfw\``, inline: true },
                { name: `${emojis.admin} Admin`, value: `\`${prefix}help admin\``, inline: true },
                { name: `${emojis.tools} Tools`, value: `\`${prefix}help tools\``, inline: true },
            )
        }
        else if (args[0] === `economy`) {
            embed.setDescription(`${emojis.economy}** Economy **\n <> = required, [] = optional`)
            embed.setColor(colors.dark_green)
            embed.addFields(
                { name: `\`${prefix}apply <job>\``, value: `applys for the specified job.`, inline: true },
                { name: `\`${prefix}balance [mention]\``, value: `checks your or another persons balance.`, inline: true },
                { name: `\`${prefix}blackjack <bet>\``, value: `play blackjack with the bot.`, inline: true },
                { name: `\`${prefix}buy <item>\``, value: `buys the provided item form the shop.`, inline: true },
                { name: `\`${prefix}deposit <money>\``, value: `deposits the provided ammount of money to your bank.`, inline: true },
                { name: `\`${prefix}withdraw <money>\``, value: `withdraws the provided ammount of money from your bank.`, inline: true },
                { name: `\`${prefix}jobs\``, value: `shows a list of jobs.`, inline: true },
                { name: `\`${prefix}profile\``, value: `shows more info about your profile.`, inline: true },
                { name: `\`${prefix}quit\``, value: `quits your current job.`, inline: true },
                { name: `\`${prefix}rank [mention]\``, value: `checks your rank.`, inline: true },
                { name: `\`${prefix}rob <mention> <money>\``, value: `robs the provided user.`, inline: true },
                { name: `\`${prefix}shop [page]\``, value: `show items for sale.`, inline: true },
                { name: `\`${prefix}work\``, value: `lets you work for some quick money.`, inline: true },
                //{ name: `\`${prefix}use <item>\``, value: ``, inline: true },
                //{ name: `\`${prefix}coinflip <bet>\``, value: ``, inline: true },
            )
        }

        else if (args[0] === `fun`) {
            embed.setDescription(`${emojis.fun} **Fun** \n <> = required, [] = optional`)
            embed.addFields(
                { name: `\`${prefix}weather <city>\``, value: `Gets the weather of the provided city and sends it in an embed.`, inline: true },
                { name: `\`${prefix}8ball <question>\``, value: `Ask the magic 8ball the answer to your question.`, inline: true },
                { name: `\`${prefix}embed <title> <hex color> <description>\``, value: `Lets you create your own customizable embed.`, inline: true },
                { name: `\`${prefix}ascii <text>\``, value: `Converts the provided text into an ascii message.`, inline: true },
                { name: `\`${prefix}calculate <equation>\``, value: `Calculates the provided equation`, inline: true },
                { name: `\`${prefix}cattext <text>\``, value: `Turns the provided text into a cat... meow :cat:`, inline: true },
                { name: `\`${prefix}covid <country/all>\``, value: `Gets some covid stats about the provided country.`, inline: true },
                { name: `\`${prefix}fact\``, value: `Sends a random fact that might be interesting.`, inline: true },
                { name: `\`${prefix}meme\``, value: `Sends a random meme from reddit.`, inline: true },
                { name: `\`${prefix}rps <choice>\``, value: `Wanna play rock paper scissors? well here you go.`, inline: true }
            )
            embed.setColor(colors.gold)
        }

        else if (args[0] === `giveaways` || args[0] === `giveaway`) {
            embed.setDescription(`${emojis.giveaway} **Giveaways** \n <> = required, [] = optional`)
            embed.addFields(
                { name: `\`${prefix}giveaway <channel> <duration> <winners> <prize>\``, value: `Starts a giveaway in the mentioned arguments.`, inline: true },
                { name: `\`${prefix}end <message id>\``, value: `Ends the giveaway specified.`, inline: true },
                { name: `\`${prefix}reroll <message id>\``, value: `rerolls the specified giveaway, if there are enough participants.`, inline: true }
            )
            embed.setColor(colors.magenta)
        }

        else if (args[0] === `info`) {
            embed.setDescription(`${emojis.info} **Info**`)
            embed.addFields(
                { name: `\`${prefix}ping\``, value: `Gets the current ping of the bot and the API latency.`, inline: true },
                { name: `\`${prefix}help\``, value: `Sends the help menu as an embed.`, inline: true },
                { name: `\`${prefix}botinfo\``, value: `Shows info about the bot, such as devs.`, inline: true },
                { name: `\`${prefix}uptime\``, value: `Checks how long the bot has been online for.`, inline: true },
                { name: `\`${prefix}links\``, value: `Sends a few handy links.`, inline: true },
                { name: `\`${prefix}checkinvites\``, value: `checks statuses for invites.`, inline: true },
                { name: `\`${prefix}buyerrequest <img link>\``, value: `requests the buyer role.`, inline: true },
                { name: `\`${prefix}verify\``, value: `Sends the captcha verification dm.`, inline: true },
            )
            embed.setColor(colors.gray)
        }

        else if (args[0] === `staff`) {
            embed.setDescription(`${emojis.staff} **Staff Command Menu** \n <> = required, [] = optional`)
            embed.addFields(
                { name: `\`${prefix}nuke\``, value: `Nukes the channel the command is executed in.`, inline: true },
                { name: `\`${prefix}purge <messages>\``, value: `Deletes the mentioned ammount of messages.`, inline: true },
                { name: `\`${prefix}announce\``, value: `Starts the setup for an announcement embed.`, inline: true },
                { name: `\`${prefix}kick <mention/id> [reason]\``, value: `Kicks the mentioned member from th server.`, inline: true },
                { name: `\`${prefix}backup <status>\``, value: `Creates, loads or gets info about the provided backup.`, inline: true },
                { name: `\`${prefix}ban <mention/id> [reason]\``, value: `Bans the specified member for the specified reason.`, inline: true },
                { name: `\`${prefix}warn <mention/id> [reason]\``, value: `warns the specified user for the specified reason.`, inline: true },
                { name: `\`${prefix}warns <mention/id>\``, value: `checks warns for the specified user.`, inline: true },
                { name: `\`${prefix}remove-warns <mention/id>\``, value: `Removes all the warns from the provided user.`, inline: true },
                { name: `\`${prefix}userinfo [mention/id]\``, value: `gets some handy info about the user.`, inline: true },
                { name: `\`${prefix}channelinfo\``, value: `gets some handy info about the current channel.`, inline: true },
                { name: `\`${prefix}boosterroles\``, value: `Sends the reaction menu for access to booster nsfw.`, inline: true },
                { name: `\`${prefix}reactionroles\``, value: `Sends the reaction menu for menu roles`, inline: true },
                { name: `\`${prefix}buyer <mention/id>\``, value: `Gives the mentioned person the buyer role.`, inline: true },
                { name: `\`${prefix}move <category>\``, value: `Moves the ticket to the provided category.`, inline: true },
                { name: `\`${prefix}rename <name>\``, value: `Renames the current ticket channel to the provided name.`, inline: true },
                { name: `\`${prefix}rules\``, value: `Sends the rules, used for the rules channel, not general use.`, inline: true },
                { name: `\`${prefix}slowmode <seconds>\``, value: `Sets the slowmode on the current channel to the provided time.`, inline: true },
                { name: `\`${prefix}unban <id>\``, value: `Unbans the provided user from the server.`, inline: true },
                { name: `\`${prefix}userinfo [mention/id]\``, value: `Gets some handy info about the provided user.`, inline: true },
                { name: `\`${prefix}mute <mention> [time] [reason]\``, value: `mutes the specified user.`, inline: true },
                { name: `\`${prefix}unmute <mention>\``, value: 'Unmutes the specified user.', inline: true }
            )
            embed.setColor(colors.black)
            if (!message.member.hasPermission(`MANAGE_MESSAGES`)) return message.channel.send(`Only staff members can run this command!`)

        }

        else if (args[0] === `music`) {
            embed.setDescription(`${emojis.music} **Music** \n <> = required, [] = optional`)
            embed.addFields(
                { name: `\`${prefix}play <song>\``, value: `Plays the specified song into the current voice channel.`, inline: true },
                { name: `\`${prefix}stop\``, value: `Stops the current song and leave the voice channel.`, inline: true },
                { name: `\`${prefix}pause\``, value: `Pauses the currently playing song until resumed.`, inline: true },
                { name: `\`${prefix}resume\``, value: `Resumes the current song on pause.`, inline: true },
                { name: `\`${prefix}queue\``, value: `Shows the current queue of songs.`, inline: true },
                { name: `\`${prefix}clear-queue\``, value: `Clears the current queue of songs.`, inline: true },
                { name: `\`${prefix}loop\``, value: `Loops the current song until disabled.`, inline: true },
                { name: `\`${prefix}suffle\``, value: `Shuffles the current queue of songs.`, inline: true },
                { name: `\`${prefix}skip\``, value: `Skips the current song and plays the next song in the queue.`, inline: true },
                { name: `\`${prefix}search <song>\``, value: `Gives you the top results for the provided song.`, inline: true },
                { name: `\`${prefix}nowplaying\``, value: `Shows some information about the currently playing song.`, inline: true },
                { name: `\`${prefix}volume <%>\``, value: `Lowers and highers the volume of the song. (1-100%)`, inline: true },
                { name: `\`${prefix}filter <filter>\``, value: `Adds a filter to the song to make it more interesting.`, inline: true },
                { name: `\`${prefix}filters\``, value: `Shows the currenly active filters.`, inline: true }

            )
            embed.setColor(colors.blue)
        }

        else if (args[0] === `nsfw` || args[0] === `NSFW`) {
            embed.setDescription(`${emojis.nsfw} **NSFW**\n<> = required, [] = optional.`)
            embed.addFields(
                { name: `\`${prefix}hentai\``, value: `Gets a hentai image and sends it.`, inline: true },
                { name: `\`${prefix}hentaigif\``, value: `Gets a hentai gif sends it.`, inline: true },
                { name: `\`${prefix}ass\``, value: `Gets a picture of ass and sends it.`, inline: true },
                { name: `\`${prefix}boobs\``, value: `Gets a picture of boobs and sends it.`, inline: true },
                { name: `\`${prefix}neko\``, value: `Gets a picture of nekos and sends it.`, inline: true },
                { name: `\`${prefix}nekogif\``, value: `Gets a gif of nekos and sends it.`, inline: true },
                { name: `\`${prefix}trap\``, value: `Femboys :drooling_face:`, inline: true },
                { name: `\`${prefix}rule34 [query]\`\naliases: \`${prefix}r34 [query]\``, value: `Searches for hentai for the provided query.`, inline: true }
            )
            embed.setColor(colors.pink)
        }

        else if (args[0] === `admin`) {
            embed.setDescription(`${emojis.admin} **Admin** \n <> = required [] = optional`)
            embed.setColor(colors.black)
            embed.addFields(
                { name: `\`${prefix}emoji <emoji> [name]\``, value: `adds the provided emoji to the server.`, inline: true },
                { name: `\`${prefix}eval <js code>\``, value: `evaluates the provided code.`, inline: true },
                { name: `\`${prefix}reactionroles\``, value: `sends the reaction role menu.`, inline: true },
                { name: `\`${prefix}restart\``, value: `restarts the bot.`, inline: true },
                { name: `\`${prefix}rules\``, value: `sends the rules.`, inline: true },
                { name: `\`${prefix}say <embed/normal> <text>\``, value: `says the provided message to the message channel.`, inline: true },
                { name: `\`${prefix}shutdown\``, value: `shuts the bot down, incase of emergency.`, inline: true },
                { name: `\`${prefix}status <state> <status>\``, value: `sets the bots status.`, inline: true },
                { name: `\`${prefix}ticketban <mention>\``, value: `stops the provided user from creating anymore tickets.`, inline: true },
                { name: `\`${prefix}ticketunban <mention>\``, value: `allows the provided user to create tickets again.`, inline: true },
                { name: `\`${prefix}verificationhelp\``, value: `sends the instructions on how to verify, using the captcha system.`, inline: true },
            )
            if (!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send("Only server administrators can run this command!")
        }

        else if (args[0] === `tools`) {
            embed.setDescription(`${emojis.tools} **Tools**`)
            embed.addFields(
                { name: `\`${prefix}status <state> <status>\``, value: 'Changes the bots status, admin only.', inline: true }
            )
            embed.setColor(colors.pink)
        }

        message.channel.send(embed);
    }
}