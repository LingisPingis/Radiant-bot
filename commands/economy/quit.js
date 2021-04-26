module.exports = {
  name: "quit",
  aliases: ["nopeworkingjustwasntthethingformeandihavedecidedtobealazyshitandsitandwatchtvalldayinmymomsbasementinstead",],

  async run(client, message, args, Discord, db) {
    const config = client.config;
    const colors = client.colors;
    const emojis = require("../../assets/emojis.json");
    let prefix = "a";
    prefix = db.get(`prefix`, prefix);

    let occupation = "job";

    const noWork = new Discord.MessageEmbed()
      .setDescription(
        `Looks like you don't have a job! You can see available jobs via the **${prefix}jobs** command.`
      )
      .setColor(colors.red);

    if (!db.get(`userdata_${message.author.id}.jobs.occupation`))
      return message.channel.send(noWork);
    if (db.get(`userdata_${message.author.id}.jobs.occupation`)) {
      let okEmbed = new Discord.MessageEmbed()
        .setTitle("We are sad to see you go!")
        .setDescription(
          `You quit your job as a ${db.get(
            `userdata_${message.author.id}.jobs.occupation`
          )} and decided to move on, before you left your co-workers decided to give you a goodbye gift, a good bye kiss on the cheek.`
        )
        .setColor(colors.red);

      db.set(`userdata_${message.author.id}.jobs.occupation`, "Unemployed");
      message.channel.send(okEmbed);
    }
  },
};
