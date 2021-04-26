module.exports = {
  name: "apply",
  aliases: ["imgoingtostartworkingandnotbeaalazypieceofshitanymore"],
  async run(client, message, args, Discord) {
    const config = client.config;
    const colors = client.colors;
    const emojis = client.emojis;
    const db = require("quick.db");

    let prefix = "a";
    prefix = db.get(`prefix`, prefix);

    let occupation = "a";
    occupation = db.get(`userdata_${message.author.id}.jobs.occupation`);

    if (!args[0]) {
      let fail = new Discord.MessageEmbed()
        .setTitle("Please specify a job!")
        .setDescription(
          "Please specify a job to apply for! Such as police, fisherman etc."
        )
        .setColor(colors.red);

      message.channel.send(fail);
      return;
    }

    const jobs = [
      "manager",
      "doctor",
      "engineer",
      "police",
      "fireman",
      "ambulance",
      "programmer",
      "fisherman",
      "mailman",
    ];
    if (occupation !== "Unemployed" || occupation == jobs) {
      let tooManyJobs = new Discord.MessageEmbed()
        .setDescription(
          `You're already working as a ${occupation}! Please quit that job before applying for a new one!`
        )
        .setFooter(`You can quit jobs by doing ${prefix}quit`)
        .setColor(colors.red);

      message.channel.send(tooManyJobs);
      return;
    }

    let reqLevel = 1;
    let requirement = "job level";
    let job = args[0].toLowerCase();

    let okEmbed = new Discord.MessageEmbed()
      .setTitle(":tada: Congrats, you are now employed!")
      .setDescription(
        `You went to a job interview and got the job as a ${job}!`
      )
      .setColor(colors.dark_green);

    let levelEmbed = new Discord.MessageEmbed()
      .setTitle("Low level!")
      .setColor(colors.dark_red);

    // manager
    if (job === "manager") {
      let doctorLvl = db.get(`userdata_${message.author.id}.doctorLvl`, 1);
      if (doctorLvl > 1000) {
        occupation = "manager";
        db.set(`userdata_${message.author.id}.jobs.occupation`, occupation);
        return message.channel.send(okEmbed);
      } else {
        reqLevel = 10;
        requirement = "doctor";
        levelEmbed.setDescription(
          `To apply for ${job} you need to be atleast a level ${reqLevel} ${requirement}!`
        );

        message.channel.send(levelEmbed);
      }
    }

    // fisherman
    if (job === "fisherman") {
      occupation = job;

      db.set(`userdata_${message.author.id}.jobs.occupation`, occupation);
      db.set(`userdata_${message.author.id}.fishermanLvl`, 1);

      return message.channel.send(okEmbed);
    }

    // doctor
    if (job === "doctor") {
      let engeneerLvl = db.get(`userdata_${message.author.id}.engeneerLvl`, 1);
      if (engeneerLvl > 500) {
        occupation = job;
        db.set(`userdata_${message.author.id}.jobs.occupation`, occupation);
        return message.channel.send(okEmbed);
      } else {
        reqLevel = 5;
        requirement = "engeneer";
        levelEmbed.setDescription(
          `To apply for ${job} you need to be a level ${reqLevel} ${requirement}!`
        );

        message.channel.send(levelEmbed);
      }
    }

    // engeneer
    if (job === "engeneer") {
      let policeLvl = db.get(`userdata_${message.author.id}.policeLvl`, 1);
      if (policeLvl > 700) {
        occupation = job;
        db.set(`userdata_${message.author.id}.jobs.occupation`, occupation);
        return message.channel.send(okEmbed);
      } else {
        reqLevel = 7;
        requirement = "police";
        levelEmbed.setDescription(
          `To apply for ${job} you need to be a level ${reqLevel} ${requirement}!`
        );

        message.channel.send(levelEmbed);
      }
    }

    // programmer (me uwu)
    if (job === "programmer") {
      let mailmanLvl = db.get(`userdata_${message.author.id}.mailmanLvl`, 1);
      if (mailmanLvl > 300) {
        occupation = job;
        db.set(`userdata_${message.author.id}.jobs.occupation`, occupation);
        return message.channel.send(okEmbed);
      } else {
        reqLevel = 3;
        requirement = "mailman";
        levelEmbed.setDescription(
          `To apply for ${job} you need to be a level ${reqLevel} ${requirement}!`
        );

        message.channel.send(levelEmbed);
      }
    }

    // mailman
    if (job === "mailman") {
      occupation = job;

      db.set(`userdata_${message.author.id}.jobs.occupation`, occupation);
      db.set(`userdata_${message.author.id}.mailmanLvl`, 1);
      return message.channel.send(okEmbed)
    }

    // police
    if (job === "police") {
      let firemanLvl = db.get(`userdata_${message.author.id}.firemanLvl`, 1);
      if (firemanLvl > 500) {
        occupation = job;
        db.set(`userdata_${message.author.id}.jobs.occupation`, occupation);
        return message.channel.send(okEmbed);
      } else {
        reqLevel = 5;
        requirement = "fireman";
        levelEmbed.setDescription(
          `To apply for ${job} you need to be a level ${reqLevel} ${requirement}!`
        );

        message.channel.send(levelEmbed);
      }
    }

    // fireman
    if (job === "fireman") {
      let ambulanceLvl = db.get(
        `userdata_${message.author.id}.ambulanceLvl`,
        1
      );
      if (ambulanceLvl > 300) {
        occupation = job;
        db.set(`userdata_${message.author.id}.jobs.occupation`, occupation);
        return message.channel.send(okEmbed);
      } else {
        reqLevel = 3;
        requirement = "ambulance";
        levelEmbed.setDescription(
          `To apply for ${job} you need to be a level ${reqLevel} ${requirement}!`
        );

        message.channel.send(levelEmbed);
      }
    }

    // emf
    if (job === "ambulance") {
      let programmerLvl = db.get(
        `userdata_${message.author.id}.programmerLvl`,
        1
      );
      if (programmerLvl > 300) {
        occupation = job;
        db.set(`userdata_${message.author.id}.jobs.occupation`, occupation);
        return message.channel.send(okEmbed);
      } else {
        reqLevel = 5;
        requirement = "engineer";
        levelEmbed.setDescription(
          `To apply for ${job} you need to be a level ${reqLevel} ${requirement}!`
        );

        message.channel.send(levelEmbed);
      }
    }
  },
};
