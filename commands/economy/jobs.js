module.exports = {
  name: "jobs",
  aliases: ["job", "occupation", "occupations", "worklist"],

  async run(client, message, args, Discord) {
    const config = client.config;
    const colors = client.colors;
    const emojis = client.emojis;
    const db = require("quick.db");

    let prefix = "a";
    prefix = db.get(`prefix`, prefix);

    let noArgs = new Discord.MessageEmbed()
      .setTitle("All available occupations")
      .setColor(colors.dark_green)
      .addField(
        ":man_office_worker: Manager",
        "Salary: ~$5000\nRequirements: Level 10 doctor",
        true
      )
      .addField(
        ":man_health_worker: Doctor",
        "Salary: ~$3800\nRequirements: Level 5 Engeneer",
        true
      )
      .addField(
        ":construction_worker: Engineer",
        "Salary: ~$3350\nRequirements: Level 7 Police",
        true
      )
      .addField(
        ":man_police_officer: Police",
        "Salary: ~$3000\nRequirements: Level 5 Fireman",
        true
      )
      .addField(
        ":fire_engine: Fireman",
        "Salary: ~$2500\nRequirements: Level 3 Ambulance",
        true
      )
      .addField(
        ":ambulance: Ambulance",
        "Salary: ~$2300\nRequirements: Level 3 Programmer",
        true
      )
      .addField(
        ":computer: Programmer",
        "Salary: ~$1700\nRequirements: Level 3 Mailman",
        true
      )
      .addField(
        ":fishing_pole_and_fish: Fisherman",
        "Salary: ~$500\nRequirements: None",
        true
      )
      .addField(
        ":mailbox_with_mail: Mailman",
        "Salary: ~$350\nRequirements: None",
        true
      )
      .setFooter(`To apply for any of these jobs do ${prefix}apply <job>`);

    message.channel.send(noArgs);
  },
};
