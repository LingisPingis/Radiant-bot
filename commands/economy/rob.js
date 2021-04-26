module.exports = {
  name: "rob",
  aliases: [],
  async run(client, message, args, Discord, db) {
    const emojis = require("../../assets/emojis.json");
    const colors = require("../../assets/colors.json");

    let user = message.mentions.users.first();
    if (!user) user = message.author;

    if (!args[0]) {
      message.channel.send(
        new Discord.MessageEmbed()
          .setAuthor(user.username, user.displayAvatarURL({ dynamic: true }))
          .setDescription("Please mention a user to rob!")
          .setColor(colors.red)
      );
    }

    let bal = user.id;
    bal = db.get(`pocket_${user.id}`, bal);
    let ammount = args[1];
    let c;
    c = db.get(`currency`, c);
    if (!c) c = "$";

    if (user.bot)
      return message.channel.send(
        new Discord.MessageEmbed()
          .setAuthor(user.username, user.displayAvatarURL({ dynamic: true }))
          .setColor(colors.red)
          .setDescription(`${user} isn't robbable as the user is a bot!`)
      );

    if (!ammount)
      return message.channel.send(
        new Discord.MessageEmbed()
          .setAuthor(user.username, user.displayAvatarURL({ dynamic: true }))
          .setColor(colors.red)
          .setDescription(`Please specify an ammount to rob from the user!`)
      );

    if (bal < 500)
      return message.channel.send(
        new Discord.MessageEmbed()
          .setAuthor(user.username, user.displayAvatarURL({ dynamic: true }))
          .setColor(colors.red)
          .setDescription(
            `${user} aren't robbable as they don't have above ${c}500!`
          )
      );

    if (ammount > bal)
      return message.channel.send(
        new Discord.MessageEmbed()
          .setAuthor(user.username, user.displayAvatarURL({ dynamic: true }))
          .setColor(colors.red)
          .setDescription(
            `${user} doesn't have enough money in their pocket! Try a smaller ammount.`
          )
      );

    if (bal > 500 && user) {
      const rob = Math.floor(Math.random() * 3);

      if (rob == 2 || rob == 3) {
        db.add(`userdata_${message.author.id}.economy.pocket`, ammount)
        db.remove(`userdata_${message.author.id}.economy.pocket`, ammount)
        message.channel.send(
            new Discord.MessageEmbed()
              .setTitle("You escaped!")
              .setDescription(
                `You robbed **${user.username}** and got away with ${c}${ammount}!`
              )
              .setColor(colors.gold)
          )
      } else {
        message.channel.send(
          new Discord.MessageEmbed()
            .setTitle("You got caught!")
            .setDescription(
              `While robbing **${user.username}** a old woman reported you to the police, and they caught you, you were fined ${c}1000!`
            )
            .setColor(colors.gold)
        )
        return db.remove(`userdata_${message.author.id}.economy.pocket`, 1000)
      }
    }
  },
};
