const client = require('nekos.life');
const neko = new client();
const Discord = require('discord.js');

module.exports = {
	name: "8ball",
  	description: "returns a response based on your question",
      async run (client, message, args, Discord) {
		
		if (!args[0]) return message.channel.send('You need to ask a question.');
		const question = args.join(' ');
		const ask = await neko.sfw['8Ball']({ text: question });
		const embed = new Discord.MessageEmbed()
			.setColor("BLUE")
			.setTitle(`[ Your question: \`${question}\` ]\n[ My answer: \`${ask.response}\` ]`)
			.setImage(ask.url)
		message.channel.send(embed);
	}
};