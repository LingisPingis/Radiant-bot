module.exports = {
  name: "profile",
  aliases: [],

  async run(client, message, args, Discord, db) {
    
    const bank = db.get(`userdata_${message.author.id}.economy.bank`);
    const pocket = db.get(`userdata_${message.author.id}.economy.pocket`);
    const xp = db.get(`userdata_${message.author.id}.levels.xp`);
    const level = db.get(`userdata_${message.author.id}.levels.level`);
    const battleslost = db.get(`userdata_${message.author.id}.battle.battleslost`);
    const battleswon = db.get(`userdata_${message.author.id}.battle.battleswon`);
    const sanity = db.get(`userdata_${message.author.id}.sanity`);
    const commands = db.get(`userdata_${message.author.id}.commands`);
    const job = db.get(`userdata_${message.author.id}.jobs.occupation`);
    const pets = db.get(`userdata_${message.author.id}.pets`);
    const items = db.get(`userdata_${message.author.id}.items`);
    const properties = db.get(`userdata_${message.author.id}.properties`);

    const embed = new Discord.MessageEmbed()
      .setColor(client.colors.gold)
      .setAuthor(
        `${message.author.username}'s Profile`,
        message.author.displayAvatarURL({ dynamic: true })
      )
      .addField(":1234: Level", level, true)
      .addField(":sparkles: XP", xp, true)
      .addField(":money_with_wings: Pocket", pocket, true)
      .addField(":bank: Bank", bank, true)
      .addField(":crossed_swords: Battles Won", battleswon, true)
      .addField(":syringe: Battles lost", battleslost, true)
      .addField(":sunny: Sanity", sanity, true)
      .addField("<:bot:817758665242050622> Commands Ran", commands, true)
      .addField(":briefcase: Occupation", job, true)
      .addField(":dog: Pets", pets.length, true)
      .addField("Items", items.length, true)
      .addField(":house: Properties", properties.length, true);

    message.channel.send(embed);
  },
};
