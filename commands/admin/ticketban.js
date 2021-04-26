module.exports = {
    name: 'ticketban',
    aliases: ["ticket-ban", "nomoreticketsforyou", "no-more-tickets-for-you"],
    async run(client, message, args, Discord) {

        const colors = client.colors

        if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send("Only staff members can use this command!")

        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if (!member) {
            return message.channel.send("Please mention a member to ticket ban!")
        }

        if (member) {
            try {
                const embedd = new Discord.MessageEmbed()
                    .setColor(colors.red)
                    .setAuthor(member.user.username, member.user.displayAvatarURL({ dynamic: true }))
                    .setDescription(`Succesfully ticket banned <@${member.id}>`)
                    .setFooter(message.author.username, message.author.displayAvatarURL({ dynamic: true }))


                    if(member.roles.cache.has('820710543651897364')) return message.channel.send(`${member.user.username} is already ticket banned!`)

                const role = message.guild.roles.cache.find(r => r.id === "820710543651897364");
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