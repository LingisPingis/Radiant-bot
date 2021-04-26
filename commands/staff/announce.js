module.exports = {
  name: "announce",
  aliases: ["ann"],
  description: "deletes a set ammount of messages",
  async run(client, message, args, Discord) {
    if (!message.member.hasPermission("BAN_MEMBERS"))
      return message.channel.send(
        "You dont have the sufficient permissions to use this command."
      );

    const message1 = new Discord.MessageEmbed()
      .setTitle(`Announcement Setup, part 1/4`)
      .setDescription(`What's the **title** for this announcement going to be?`)
      .setColor(`BLUE`)
      .setFooter(
        `${message.author.tag}`,
        `${message.author.displayAvatarURL()}`
      )
      .setTimestamp();
    message.channel.send(message1).then((msg2) => {
      let titulo = message.channel
        .createMessageCollector((t) => t.author.id === message.author.id, {
          max: 1,
        })
        .on("collect", (t) => {
          let title = t.content;

          const message2 = new Discord.MessageEmbed()
            .setTitle(`Announcement Setup, part 2/4`)
            .setDescription(
              `What's the **Description** for this announcement going to be?`
            )
            .setColor(`BLUE`)
            .setFooter(
              `${message.author.tag}`,
              `${message.author.displayAvatarURL()}`
            )
            .setTimestamp();
          message.channel.send(message2).then((msg3) => {
            let description = message.channel
              .createMessageCollector(
                (d) => d.author.id === message.author.id,
                {
                  max: 1,
                }
              )
              .on("collect", (d) => {
                let desc = d.content;

                const message3 = new Discord.MessageEmbed()
                  .setTitle(`Announcement Setup, part 3/4`)
                  .setDescription(
                    `What's the **Colour** on the embed going to be?`
                  )
                  .setColor(`BLUE`)
                  .setFooter(
                    `${message.author.tag}`,
                    `${message.author.displayAvatarURL()}`
                  )
                  .setTimestamp();

                message.channel.send(message3).then((msg4) => {
                  let color = message.channel
                    .createMessageCollector(
                      (d) => d.author.id === message.author.id,
                      {
                        max: 1,
                      }
                    )
                    .on("collect", (c) => {
                      let colour = c.content.replace("purple", "#9900FF");
                      const message4 = new Discord.MessageEmbed()
                        .setTitle(`Announcement Setup, part 4/4`)
                        .setDescription(
                          `Mention the **Channel** you want to send message to.`
                        )
                        .setColor(`BLUE`)
                        .setFooter(
                          `${message.author.tag}`,
                          `${message.author.displayAvatarURL()}`
                        )
                        .setTimestamp();
                      message.channel.send(message4).then((msg5) => {
                        let chn = message.channel
                          .createMessageCollector(
                            (d) => d.author.id === message.author.id,
                            {
                              max: 1,
                            }
                          )
                          .on("collect", async (ch) => {
                            try {
                              const channel1 = ch.content;
                              const destination = message.guild.channels.cache.get(
                                channel1.match(/<#(\d+)>/)[1]
                              );
                              const success = new Discord.MessageEmbed()
                                .addField(
                                  `Success`,
                                  `Announcement was sent to ${destination}!`
                                )
                                .setColor("GREEN")
                                .setFooter(
                                  `Command Used By: ${message.author.tag}`,
                                  `${message.author.displayAvatarURL()}`
                                )
                                .setTimestamp();

                              const embed = new Discord.MessageEmbed()
                                .setTitle(title)
                                .setDescription(`${desc}`)
                                .setColor(`${colour.toUpperCase()}`)
                                .setFooter(
                                  `Announcement By: ${message.author.tag}`,
                                  `${message.author.displayAvatarURL()}`
                                );
                              destination.send(embed);
                              destination
                                .send("@everyone")
                                .then((m) => m.delete());
                              message.channel.send(success);
                            } catch (e) {
                              console.log(e);
                              const Error = new Discord.MessageEmbed()
                                .addField(
                                  "ERROR",
                                  `I was unable to send the announcement, please try again!\nError: \`${e}\``
                                )
                                .setColor("#C70000")
                                .setFooter(
                                  `${message.author.tag}`,
                                  `${message.author.displayAvatarURL({
                                    dynamic: true,
                                  })}`
                                )
                                .setTimestamp();
                              message.channel.send(Error);
                            }
                          });
                      });
                    });
                });
              });
          });
        });
    });
  },
};
