module.exports = async (Discord, client, member) => {

	const colors = require('../../assets/colors.json');
	const emojis = require('../../assets/emojis.json');
	const config = require('../../assets/config.json');
	const guild = client.guilds.cache.get(config.serverID);
	const db = require('quick.db')
	// welcome config

	let stats = {
		serverID: '828628729202737162',
	}

	let membeer = 'a'
	membeer = db.get(`memberCounter_${member.guild.id}`, membeer)

	if (membeer) {
		if (member.guild.id !== stats.serverID) return;
		//    client.channels.cache.get(stats.total).setName(`Total Users: ${member.guild.memberCount}`);
		client.channels.cache.get(membeer).setName(`👥 Members: ${member.guild.members.cache.size}`);
		//client.channels.cache.get(stats.bots).setName(`Bots: ${member.guild.members.cache.filter(m => m.user.bot).size}`);
	}

	const moment = require('moment')
	const embedAbc = new Discord.MessageEmbed()
		.setAuthor(member.user.tag, member.user.displayAvatarURL({ dynamic: true }))
		.setTitle("Member Left")
		.setColor(colors.red)
		.setDescription(`<@!${member.user.id}> just left the server!` + "\n" + emojis.calendar + " " + `Created On \`${moment(member.user.createdAt).format('MMM DD YYYY')}\`\n` + emojis.calendar2 + `Joined Server On \`${moment(member.guild.joinedAt).format('MMM DD YYYY')}\``)
		.setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
		.setFooter("ID: " + member.user.id)

	const addLog = member.guild.channels.cache.get(config.logs)
	if (!addLog) return;
	addLog.send(embedAbc)
};