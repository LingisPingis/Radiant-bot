const { parseDur } = require('../../assets/functions');
const { MessageEmbed } = require('discord.js')
module.exports = {
	name: 'uptime',
	description: 'Check how long has the bot been online.',
	aliases: [ 'ontime' ],
	 async run (client, message, args, Discord) {
		const duration = parseDur(client.uptime);
		message.channel.send('⌛ Loading...').then((message) => { message.delete()
			const pEmbed = new MessageEmbed()
				.setTitle(':inbox_tray: Online for')
				.setColor('BLUE')
				.setDescription(
					`**${duration}**`,
				);
			message.channel.send(pEmbed);
		});
	}
}