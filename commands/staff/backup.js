const backup = require("discord-backup")
const Sentry = require('@sentry/node')

module.exports = {
    name: 'backup',
    alises: ['maygodhelpus'],

    async run(client, message, args, Discord) {

        const emojis = require('../../assets/emojis.json')
        const config = client.config
        const colors = client.colors

        if (!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send('Only server administrators can use this command!')

		const status = args[0];
		if(!status){
			return message.channel.send(`${emojis.fail} Missing status! \n\n Statuses:\n\n${config.prefix}backup create\n${config.prefix}backup load <backup id>\n${config.prefix}backup info <backup id>`);
		}

        if (status === "create") {
            const m = await message.channel.send(`${emojis.loading} Please wait while i create the backup!`, null, {
                prefixEmoji: "loading"
            });
			backup.create(message.guild).then((backup) => {
                m.delete();
                message.channel.send("Yay! Looks like i created a backup for you, Check your dms for the id!");
                message.author.send(`Your backup for **${message.guild.name}** has been created, here is the id, save it somewhere and load it in another server!\n\n Your backup id: \`${backup.id}\``, {
                    backupID: backup.id
                }).catch(() => {
					backup.remove(backup.id);
                message.channel.send(`${emojis.misc} Error! I can not dm you the backup id, Please turn on dms for this server!`);
                });
            }).catch((err) => {
                Sentry.captureException(err);
                return message.channel.send(`${emojis.misc} oops! Looks like i ran into an error! \n Error: \`${err}\``);
            });
        } else if (status === "load") {
            const backupID = args[1];
            if (!backupID) {
                return message.channel.send("Please provide a valid backup id!");
            }
			backup.fetch(backupID).then(async () => {
                message.channel.send("Are you sure you want to load this backup? \n This action is **__irreversible__** and cannot be undone, to confirm simple reply with \"confirm\"");
                await message.channel.awaitMessages(m => (m.author.id === message.author.id) && (m.content === "confirm"), {
                    max: 1,
                    time: 45000,
                    errors: ["time"]
                }).catch(() => {
                    // if the author of the commands does not confirm the backup loading
                    return message.channel.send(`${emojis.time} Backup loading cancelled due to no response, please try again!`);
                });
                // When the author of the command has confirmed that he wants to load the backup on his server
                message.author.send(`${emojis.loading} Loading backup... Please wait!`);
                // Load the backup
                backup.load(backupID, message.guild).then(() => {
                    // When the backup is loaded, delete them from the server
                    backup.remove(backupID);
                    message.author.send(`${emojis.success} Backup loaded!`);
                }).catch((err) => {
                    Sentry.captureException(err);
                    // If an error occurenced
                    return message.channel.send(`${emojis.fail} Unexpected error occured! \n\n Error: \`${err}\``);
                });
            }).catch(() => {
                // if the backup wasn't found
                return message.channel.send("Hmm, are you sure you copy pasted the id correctly? I can't seem to find it in my database!", {
                    backupID
                });
            });
        } else if (status === "info") {
            const backupID = args[1];
            if(!backupID){
                return message.channel.send(":x: | You must specify a valid backup ID!");
            }
            // Fetch the backup
            backup.fetch(backupID).then((backupInfos) => {
                const date = new Date(backupInfos.data.createdTimestamp);
                const yyyy = date.getFullYear().toString(), mm = (date.getMonth()+1).toString(), dd = date.getDate().toString();
                const formatedDate = `${yyyy}/${(mm[1]?mm:"0"+mm[0])}/${(dd[1]?dd:"0"+dd[0])}`;
                let embed = new Discord.MessageEmbed()
                    .setAuthor("Backup Information")
                    // Display the backup ID
                    .addField("Backup ID", `\`${backupInfos.id}\``, true)
                    // Displays the server from which this backup comes
                    .addField("Server ID", `\`${backupInfos.data.guildID}\``, true)
                    // Display the size (in mb) of the backup
                    .addField("Size", `\`${backupInfos.size}\` kb`, true)
                    // Display when the backup was created
                    .addField("Created at", formatedDate, true)
                    .setColor(colors.blue);
                message.channel.send(embed);
            }).catch(() => {
                // if the backup wasn't found
                return message.channel.send(`I couldn't find any backup like \`${args[1]}\`, make sure you pasted it correctly!`, {
                    backupID
                });
            });
        } else {
            return message.channel.send(`${emojis.fail} Missing status! \n\n Statuses:\n\n${config.prefix}backup create\n${config.prefix}backup load <backup id>\n${config.prefix}backup info <backup id>`);
        }

    }
}