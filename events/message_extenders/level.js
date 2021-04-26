module.exports = async (client, Discord, message, db) => {
  if (message.author.bot) return;

  let user = message.author.id;
  let xp = db.get(`userdata_${user}.levels.xp`);

  let embed = new Discord.MessageEmbed()
    .setTitle("Level up!")
    .setColor(client.colors.gold);

  db.add(`userdata_${user}.levels.xp`, 1);

  if (!db.get(`level1`, 25)) {
    db.set(`level1`, 25);
    db.set(`level2`, 75);
    db.set(`level3`, 150);
    db.set(`level4`, 225);
    db.set(`level5`, 280);
    db.set(`level6`, 350);
    db.set(`level7`, 430);
    db.set(`level8`, 520);
    db.set(`level9`, 620);
    db.set(`level10`, 750);
    db.set(`level11`, 925);
    db.set(`level12`, 1095);
    db.set(`level13`, 1250);
    db.set(`level14`, 1400);
    db.set(`level15`, 1690);
    db.set(`level16`, 1920);
    db.set(`level17`, 2395);
    db.set(`level18`, 2650);
    db.set(`level19`, 2900);
    db.set(`level20`, 3500);
  }

  if (xp == 25) {
    db.add(`userdata_${user}.levels.level`, 1);
    embed.setDescription(
      `Congrats **<@${user}>**! You advanced to level **2**`
    );
    message.channel.send(embed);
  }
  if (xp == 75) {
    db.add(`userdata_${user}.levels.level`, 1);
    embed.setDescription(
      `Congrats **<@${user}>**! You advanced to level **3**`
    );
    message.channel.send(embed);
  }
  if (xp == 150) {
    db.add(`userdata_${user}.levels.level`, 1);
    embed.setDescription(
      `Congrats **<@${user}>**! You advanced to level **4**`
    );
    message.channel.send(embed);
  }
  if (xp == 225) {
    db.add(`userdata_${user}.levels.level`, 1);
    embed.setDescription(
      `Congrats **<@${user}>**! You advanced to level **5**`
    );
    message.channel.send(embed);
  }
  if (xp == 280) {
    db.add(`userdata_${user}.levels.level`, 1);
    embed.setDescription(
      `Congrats **<@${user}>**! You advanced to level **6**`
    );
    message.channel.send(embed);
  }
  if (xp == 350) {
    db.add(`userdata_${user}.levels.level`, 1);
    embed.setDescription(
      `Congrats **<@${user}>**! You advanced to level **7**`
    );
    message.channel.send(embed);
  }
  if (xp == 430) {
    db.add(`userdata_${user}.levels.level`, 1);
    embed.setDescription(
      `Congrats **<@${user}>**! You advanced to level **8**`
    );
    message.channel.send(embed);
  }
  if (xp == 520) {
    db.add(`userdata_${user}.levels.level`, 1);
    embed.setDescription(
      `Congrats **<@${user}>**! You advanced to level **9**`
    );
    message.channel.send(embed);
  }
  if (xp == 620) {
    db.add(`userdata_${user}.levels.level`, 1);
    embed.setDescription(
      `Congrats **<@${user}>**! You advanced to level **10**`
    );
    message.channel.send(embed);
  }
  if (xp == 750) {
    db.add(`userdata_${user}.levels.level`, 1);
    embed.setDescription(
      `Congrats **<@${user}>**! You advanced to level **11**`
    );
    message.channel.send(embed);
  }
  if (xp == 925) {
    db.add(`userdata_${user}.levels.level`, 1);
    embed.setDescription(
      `Congrats **<@${user}>**! You advanced to level **12**`
    );
    message.channel.send(embed);
  }
  if (xp == 1095) {
    db.add(`userdata_${user}.levels.level`, 1);
    embed.setDescription(
      `Congrats **<@${user}>**! You advanced to level **13**`
    );
    message.channel.send(embed);
  }
  if (xp == 1250) {
    db.add(`userdata_${user}.levels.level`, 1);
    embed.setDescription(
      `Congrats **<@${user}>**! You advanced to level **14**`
    );
    message.channel.send(embed);
  }
  if (xp == 1400) {
    db.add(`userdata_${user}.levels.level`, 1);
    embed.setDescription(
      `Congrats **<@${user}>**! You advanced to level **15**`
    );
    message.channel.send(embed);
  }
  if (xp == 1690) {
    db.add(`userdata_${user}.levels.level`, 1);
    embed.setDescription(
      `Congrats **<@${user}>**! You advanced to level **16**`
    );
    message.channel.send(embed);
  }
  if (xp == 1920) {
    db.add(`userdata_${user}.levels.level`, 1);
    embed.setDescription(
      `Congrats **<@${user}>**! You advanced to level **17**`
    );
    message.channel.send(embed);
  }
  if (xp == 2395) {
    db.add(`userdata_${user}.levels.level`, 1);
    embed.setDescription(
      `Congrats **<@${user}>**! You advanced to level **18**`
    );
    message.channel.send(embed);
  }
  if (xp == 2650) {
    db.add(`userdata_${user}.levels.level`, 1);
    embed.setDescription(
      `Congrats **<@${user}>**! You advanced to level **19**`
    );
    message.channel.send(embed);
  }
  if (xp == 2900) {
    db.add(`userdata_${user}.levels.level`, 1);
    embed.setDescription(
      `Congrats **<@${user}>**! You advanced to level **20**`
    );
    message.channel.send(embed);
  }
  if (xp == 3500) {
    db.add(`userdata_${user}.levels.level`, 1);
    embed.setDescription(
      `Congrats **<@${user}>**! You advanced to level **21**`
    );
    message.channel.send(embed);
  }
};
