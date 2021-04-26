module.exports = {
    name: 'buyer',
    async run(client, message, args, Discord, db) {

        const colors = client.colors

        if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send("Only staff members can use this command!")

        let buyerrole;
        if (!db.get(`buyerrole`, buyerrole)) return message.channel.send(new Discord.MessageEmbed().setTitle("Error").setDescription("I could not find the buyer role, please set this command up in the settings!").setColor(client.colors.red))
        buyerrole = db.get(`buyerrole`, buyerrole)

        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if (!member) {
            return message.channel.send("Please mention a member to give the buyer role to!")
        }

        if (member) {
            try {
                const embedd = new Discord.MessageEmbed()
                    .setColor(colors.gold)
                    .setAuthor(member.user.username, member.user.displayAvatarURL({ dynamic: true }))
                    .setDescription(`Succesfully gave <@${member.id}> buyer role!`)
                    .setFooter(message.author.username, message.author.displayAvatarURL({ dynamic: true }))

                const role = message.guild.roles.cache.find(r => r.id === buyerrole);
                member.roles.add(role)
                return message.channel.send(embedd);
            }
            catch (err) {
                message.channel.send(`oops, looks like i ran into an error!\n\nError: ${err}`);
                return console.log(err)
            }
        }
    }
}