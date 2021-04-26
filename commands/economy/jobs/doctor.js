module.exports = (client, message, args, Discord, db, money) => {
  let badJob = Math.floor(Math.random() * 10) + 1;
  const colors = client.colors;

  if (badJob == 3) {
    const embed = new Discord.MessageEmbed()
      .setTitle(`:office: Work`)
      .setDescription(
        `Your boss didn't like the work you did, so you left empty handed!`
      )
      .setColor(colors.red);
    message.channel.send(embed);

    db.set(`badwork_${message.author.id}`, true);
    return;
  } else {
    let balanceTotal = "a";
    let balance = db.add(`userdata_${message.author.id}.economy.pocket`, money);

    if (!db.get(`userdata_${message.author.id}.economy.pocket`, balanceTotal)) {
      db.set(`userdata_${message.author.id}.economy.pocket`, money);
    } else {
      balance;
    }

    let level = db.add(`userdata_${message.author.id}.jobs.doctorLvl`, 1);
  }

  let level = db.get(`userdata_${message.author.id}.jobs.doctorLvl`, 1);
  let levelEmbed = new Discord.MessageEmbed()
    .setTitle("Level up!")
    .setDescription(
      `Congratulations ${message.author.username}, you leveled up to level ${
        level / 100
      } as a doctor!`
    )
    .setColor(colors.purple);

  if (level == 100) {
    message.channel.send(levelEmbed);
  }
  if (level == 200) {
    message.channel.send(levelEmbed);
  }
  if (level == 300) {
    message.channel.send(levelEmbed);
  }
  if (level == 400) {
    message.channel.send(levelEmbed);
  }
  if (level == 500) {
    message.channel.send(levelEmbed);
  }
  if (level == 600) {
    message.channel.send(levelEmbed);
  }
  if (level == 700) {
    message.channel.send(levelEmbed);
  }
  if (level == 800) {
    message.channel.send(levelEmbed);
  }
  if (level == 900) {
    message.channel.send(levelEmbed);
  }
  if (level == 1000) {
    message.channel.send(levelEmbed);
  }
};
