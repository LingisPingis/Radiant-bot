module.exports = {
  name: 'roulette',
  description: 'Play a game of roulette',
  async run(client, message, args, Discord, db) {

    const roulette = [
      { color: 'Green', number: '0' },
      { color: 'Red', number: '1' },
      { color: 'Black', number: '2' },
      { color: 'Red', number: '3' },
      { color: 'Black', number: '4' },
      { color: 'Red', number: '5' },
      { color: 'Black', number: '6' },
      { color: 'Red', number: '7' },
      { color: 'Black', number: '8' },
      { color: 'Red', number: '9' },
      { color: 'Black', number: '10' },
      { color: 'Black', number: '11' },
      { color: 'Red', number: '12' },
      { color: 'Black', number: '13' },
      { color: 'Red', number: '14' },
      { color: 'Black', number: '15' },
      { color: 'Red', number: '16' },
      { color: 'Black', number: '17' },
      { color: 'Red', number: '18' },
      { color: 'Red', number: '19' },
      { color: 'Black', number: '20' },
      { color: 'Red', number: '21' },
      { color: 'Black', number: '22' },
      { color: 'Red', number: '23' },
      { color: 'Black', number: '24' },
      { color: 'Red', number: '25' },
      { color: 'Black', number: '26' },
      { color: 'Red', number: '27' },
      { color: 'Black', number: '28' },
      { color: 'Black', number: '29' },
      { color: 'Red', number: '30' },
      { color: 'Black', number: '31' },
      { color: 'Red', number: '32' },
      { color: 'Black', number: '33' },
      { color: 'Red', number: '34' },
      { color: 'Black', number: '35' },
      { color: 'Red', number: '36' }
    ];

    let money = db.get(`userdata_${message.author.id}.economy.pocket`)
    const helpers = require('../../assets/helpers/withcommas');

    if (money === 0 || money < 1) {
      return message.channel.send(new Discord.MessageEmbed().setTitle("Roulette").setDescription("You don't have enough money to bet!").setColor(client.colors.red));
    } else {
      const rltNumber = Math.floor(Math.random() * roulette.length);
      const playerIcon = message.author.displayAvatarURL().replace(".webp", ".png");
      const betAmount = parseInt(args[1]);
      const validColors = ['green', 'red', 'black'];
      let guessColor = args[0]

      if (!betAmount) return message.channel.send(new Discord.MessageEmbed().setTitle("Roulette").setDescription('Missing bet amount. `{{ prefix }}roulette <color/number> <bet>`'.replace("{{ prefix }}", db.get("prefix"))).setColor(client.colors.red))
      if (isNaN(betAmount)) return message.channel.send(new Discord.MessageEmbed().setTitle("Roulette").setDescription('Invalid bet amount.').setColor(client.colors.red));
      if (betAmount < 1) return message.channel.send(new Discord.MessageEmbed().setTitle("Roulette").setDescription("You can't bet less then {{ c }}1!".replace("{{ c }}", db.get(`currency`).setColor(client.colors.red))));
      if (betAmount > 5000) return message.channel.send(new Discord.MessageEmbed().setTitle("Roulette").setDescription('The max bet is {{ c }}5,000!'.replace("{{ c }}", db.get(`currency`).setColor(client.colors.red))));
      if (betAmount > money) return message.channel.send(new Discord.MessageEmbed().setTitle("Roulette").setDescription("You can't bet more then you have in your wallet!").setColor(client.colors.red));

      // Color bets
      if (validColors.includes(guessColor)) {
        guessColor = helpers.capitalize(guessColor);
        const resultColor = roulette[rltNumber].color;
        const resultNumber = roulette[rltNumber].number;
        const winAmount = betAmount + betAmount; // 1:1

        if (guessColor == resultColor) {
          const winEmbed = new Discord.MessageEmbed()
            .setTitle(`🎰 Roulette 🎰`)
            .addField(`Guess:`, `${guessColor}`, true)
            .addField(`Result:`, `${resultColor} ${resultNumber}`, true)
            .setFooter(`You won €${helpers.withCommas(winAmount)}!`.replace(`€`, db.get(`currency`)), playerIcon)
            .setColor(client.colors.green);

          money = money - betAmount + winAmount;
          db.set(`userdata_${message.author.id}.economy.pocket`, money)
          return message.channel.send(winEmbed);
        } else {
          const loseEmbed = new Discord.MessageEmbed()
            .setTitle(`🎰 Roulette 🎰`)
            .addField(`Guess:`, `${guessColor}`, true)
            .addField(`Result:`, `${resultColor} ${resultNumber}`, true)
            .setFooter(`You lost €${helpers.withCommas(betAmount)}!`.replace(`€`, db.get(`currency`)), playerIcon)
            .setColor(client.colors.red);

          money = money - betAmount;
          db.set(`userdata_${message.author.id}.economy.pocket`, money)
          return message.channel.send(loseEmbed);
        }
      } else {
        // Number bets
        if (args[0] < 0) return message.channel.send('Guess must be number 0-36');
        if (args[0] > 36) return message.channel.send('Guess must be number 0-36');
        if (isNaN(args[0]) || isNaN(args[1])) return message.channel.send('Invalid bet or guess.');

        const guessNumber = args[0];
        const guessColor = roulette[guessNumber].color;
        const resultNumber = roulette[rltNumber].number;
        const resultColor = roulette[rltNumber].color;
        const winAmount = betAmount * 35 + betAmount; // 35:1

        if (guessNumber == resultNumber) {
          const winEmbed = new Discord.MessageEmbed()
            .setTitle(`🎰 Roulette 🎰`)
            .addField(`Guess:`, `${guessColor} ${guessNumber}`, true)
            .addField(`Result:`, `${resultColor} ${resultNumber}`, true)
            .setFooter(`You won €${helpers.withCommas(winAmount)}!`.replace(`€`, db.get(`currency`)), playerIcon)
            .setColor(client.colors.green);

          money = money - betAmount + winAmount;
          db.set(`userdata_${message.author.id}.economy.pocket`, money)
          return message.channel.send(winEmbed);
        } else {
          const loseEmbed = new Discord.MessageEmbed()
            .setTitle(`🎰 Roulette 🎰`)
            .addField(`Guess:`, `${guessColor} ${guessNumber}`, true)
            .addField(`Result:`, `${resultColor} ${resultNumber}`, true)
            .setFooter(`You lost €${helpers.withCommas(betAmount)}!`.replace(`€`, db.get(`currency`)), playerIcon)
            .setColor(client.colors.red);

          money = money - betAmount;
          db.set(`userdata_${message.author.id}.economy.pocket`, money)
          return message.channel.send(loseEmbed);
        }
      }
    }
  }
}