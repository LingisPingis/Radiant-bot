const Discord = require("discord.js")
const color = require('./colors.json')

module.exports = {

	// botinfo.js
	formatBytes: function (a, b) {
		if (a == 0) return '0 Bytes';
		const c = 1024,
			d = b || 2,
			e = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
			f = Math.floor(Math.log(a) / Math.log(c));

		return parseFloat((a / Math.pow(c, f)).toFixed(d)) + ' ' + e[f];
	},

	// eval,js
	clean: function (string) {
		if (typeof text === 'string') {
			return string.replace(/`/g, '`' + String.fromCharCode(8203))
				.replace(/@/g, '@' + String.fromCharCode(8203));
		}
		else {
			return string;
		}
	},

	// uptime.js & botinfo.js
	parseDur: function (ms) {
		let seconds = ms / 1000;

		const days = parseInt(seconds / 86400);
		seconds = seconds % 86400;

		const hours = parseInt(seconds / 3600);
		seconds = seconds % 3600;

		const minutes = parseInt(seconds / 60);
		seconds = parseInt(seconds % 60);

		if (days) {
			return `\`${days}\` day(s), \`${hours}\` hour(s), \`${minutes}\` minute(s)`;
		}
		else if (hours) {
			return `\`${hours}\` hour(s), \`${minutes}\` minute(s), \`${seconds}\` seconds`;
		}
		else if (minutes) {
			return `\`${minutes}\` minute(s), \`${seconds}\` seconds`;
		}
		return `\`${seconds}\` second(s)`;
	},

	// message.js
	validatePermissions: function (permissions) {
		const validPermissions = [
			'CREATE_INSTANT_INVITE',
			'KICK_MEMBERS',
			'BAN_MEMBERS',
			'ADMINISTRATOR',
			'MANAGE_CHANNELS',
			'MANAGE_GUILD',
			'ADD_REACTIONS',
			'VIEW_AUDIT_LOG',
			'PRIORITY_SPEAKER',
			'STREAM',
			'VIEW_CHANNEL',
			'SEND_MESSAGES',
			'SEND_TTS_MESSAGES',
			'MANAGE_MESSAGES',
			'EMBED_LINKS',
			'ATTACH_FILES',
			'READ_MESSAGE_HISTORY',
			'MENTION_EVERYONE',
			'USE_EXTERNAL_EMOJIS',
			'VIEW_GUILD_INSIGHTS',
			'CONNECT',
			'SPEAK',
			'MUTE_MEMBERS',
			'DEAFEN_MEMBERS',
			'MOVE_MEMBERS',
			'USE_VAD',
			'CHANGE_NICKNAME',
			'MANAGE_NICKNAMES',
			'MANAGE_ROLES',
			'MANAGE_WEBHOOKS',
			'MANAGE_EMOJIS',
			'BOT_OWNER',
		];

		for (const permission of permissions) {
			if (!validPermissions.includes(permission)) {
				throw new Error(`Unknown permission "${permission}"`);
			}
		}
	},
}