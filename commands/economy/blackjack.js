module.exports = {
  name: "blackjack",
  aliases: ["bj", "bjack", "blackj"],

  async run(client, message, args, Discord, db) {
    const ms = require("parse-ms");
    const colors = client.colors;
    const emojis = client.emojis;

    if (!message.guild.me.hasPermission("MANAGE_MESSAGES")) {
      const adm = new Discord.MessageEmbed()
        .setColor(colors.red)
        .setTitle(
          "You need to give the `Manage Messages` permission to use this command."
        );
      return message.channel.send(adm);
    }

    let money = parseInt(args[1]);
    let moneydb;
    moneydb = db.get(`userdata_${message.author.id}.economy.pocket`);

    let timeout1 = 6140000;
    let author1 = await db.fetch(`hit_${message.author.id}`);

    if (author1 !== null && timeout1 - (Date.now() - author1) > 0) {
      let time = ms(timeout1 - (Date.now() - author1));

      const presomax = new Discord.MessageEmbed()
        .setColor(colors.red)
        .setTitle(emojis.fail + " You can't play blackjack in prison!")
        .setDescription(
          "`Time until released: " +
          `${time.minutes}` +
          "m " +
          `${time.seconds}` +
          "s`"
        );

      return message.channel.send(presomax);
    } else {
      if (args[0] === "all" || args[0] === "max") {
        money = moneydb;
      } else {
        money = parseInt(args[0]);
      }

      if (!args[0]) {
        let prefix;
        prefix = db.get(`prefix`, prefix);
        if (prefix === null) prefix = "-";
        const noargs = new Discord.MessageEmbed()
          .setColor(colors.red)
          .setTitle(":spades: :hearts: Blackjack :clubs: :diamonds:")
          .setDescription(
            `Please specify a valid ammount of money to bet! \nExample: ${prefix}blackjack all`
          );
        return message.channel.send(noargs);
      }

      if (!money || money < 1 || money > moneydb) {
        let prefix;
        prefix = db.get(`prefix`, prefix);
        if (prefix === null) prefix = "-";

        const nomumber = new Discord.MessageEmbed()
          .setColor(colors.red)
          .setTitle(":spades: :hearts: Blackjack :clubs: :diamonds:")
          .setDescription(
            "You don't have enough money in your pocket to bet that ammount!"
          );
        message.channel.send(nomumber);
        return;
      }

      var numCardsPulled = 0;
      var gameOver = false;

      var player = { cards: [], score: 0 };
      var dealer = { cards: [], score: 0 };

      function getCardsValue(a) {
        var cardArray = [];
        (sum = 0), (i = 0), (dk = 10.5), (doubleking = "QQ"), (aceCount = 0);
        cardArray = a;
        for (i; i < cardArray.length; i += 1) {
          if (
            cardArray[i].rank === "J" ||
            cardArray[i].rank === "Q" ||
            cardArray[i].rank === "K"
          ) {
            sum += 10;
          } else if (cardArray[i].rank === "A") {
            sum += 11;
            aceCount += 1;
          } else if (cardArray[i].rank === doubleking) {
            sum += dk;
          } else {
            sum += cardArray[i].rank;
          }
        }
        while (aceCount > 0 && sum > 21) {
          sum -= 10;
          aceCount -= 1;
        }
        return sum;
      }

      var deck = {
        deckArray: [],
        initialize: function () {
          var suitArray, rankArray, s, r, n;
          suitArray = ["Clubs", "Diamonds", "Hearts", "Spades"];
          rankArray = [2, 3, 4, 5, 6, 7, 8, 9, 10, "J", "Q", "K", "A"];
          n = 13;
          for (s = 0; s < suitArray.length; s += 1) {
            for (r = 0; r < rankArray.length; r += 1) {
              this.deckArray[s * n + r] = {
                rank: rankArray[r],
                suit: suitArray[s],
              };
            }
          }
        },
        shuffle: function () {
          var temp, i, rnd;
          for (i = 0; i < this.deckArray.length; i += 1) {
            rnd = Math.floor(Math.random() * this.deckArray.length);
            temp = this.deckArray[i];
            this.deckArray[i] = this.deckArray[rnd];
            this.deckArray[rnd] = temp;
          }
        },
      };

      deck.initialize();
      deck.shuffle();

      async function bet(outcome) {
        if (outcome === "win") {
          db.add(`userdata_${message.author.id}.economy.pocket`, money);
        }
        if (outcome === "lose") {
          db.subtract(`userdata_${message.author.id}.economy.pocket`, money);
        }
      }

      function resetGame() {
        numCardsPulled = 0;
        player.cards = [];
        dealer.cards = [];
        player.score = 0;
        dealer.score = 0;
        deck.initialize();
      }

      function endMsg(title, msg, dealerC) {
        let cardsMsg = "";
        player.cards.forEach(function (card) {
          cardsMsg += "[" + card.rank.toString();
          if (card.suit == "Hearts") cardsMsg += "`♥`";
          if (card.suit == "Diamonds") cardsMsg += "`♦`";
          if (card.suit == "Spades") cardsMsg += "`♠`";
          if (card.suit == "Clubs") cardsMsg += "`♣`";
          cardsMsg += "](https://radiantcheats.net) ";
        });
        cardsMsg += " = " + player.score.toString();

        let dealerMsg = "";
        if (!dealerC) {
          dealerMsg = "[" + dealer.cards[0].rank.toString();
          if (dealer.cards[0].suit == "Hearts") dealerMsg += "`♥`";
          if (dealer.cards[0].suit == "Diamonds") dealerMsg += "`♦`";
          if (dealer.cards[0].suit == "Spades") dealerMsg += "`♠`";
          if (dealer.cards[0].suit == "Clubs") dealerMsg += "`♣`";
          dealerMsg += " ? ?](https://radiantcheats.net)";
        } else {
          dealerMsg = "";
          dealer.cards.forEach(function (card) {
            dealerMsg += "[" + card.rank.toString();
            if (card.suit == "corações") dealerMsg += "`♥`";
            if (card.suit == "diamantes") dealerMsg += "`♦`";
            if (card.suit == "espadas") dealerMsg += "`♠`";
            if (card.suit == "clubes") dealerMsg += "`♣`";
            dealerMsg += "](https://radiantcheats.net) ";
          });
          dealerMsg += " = " + dealer.score.toString();
        }

        const gambleEmbed = new Discord.MessageEmbed()
          .setColor(colors.blue)
          .setAuthor(
            `${message.author.username} started a game of BlackJack!`,
            message.author.displayAvatarURL()
          )
          .addField("Your cards ", "**" + cardsMsg + "**")
          .addField("Dealers cards ", "**" + dealerMsg + "**")
          .addField(title, msg);

        message.channel.send(gambleEmbed);
      }

      async function endGame() {
        if (player.score === 21) {
          bet("win");
          gameOver = true;
          await endMsg("You won!", "You got 21 and won the game!", true);
        }
        if (player.score > 21) {
          bet("lose");
          gameOver = true;
          await endMsg("You lost!", "You passed 21 points.", true);
        }
        if (dealer.score === 21) {
          bet("lose");
          gameOver = true;
          await endMsg("You lost!", "I got 21 points!", true);
        }
        if (dealer.score > 21) {
          bet("win");
          gameOver = true;
          await endMsg("You win!", "I got over 21 points.", true);
        }
        if (
          dealer.score >= 17 &&
          player.score > dealer.score &&
          player.score < 21
        ) {
          bet("win");
          gameOver = true;
          await endMsg("You won!", "I got 17 points, therefore you won!", true);
        }
        if (
          dealer.score >= 17 &&
          player.score < dealer.score &&
          dealer.score < 21
        ) {
          bet("lose");
          gameOver = true;
          await endMsg(
            "You lost!",
            "I got closer to 21 when both of us had more then 17 points.",
            true
          );
        }
        if (
          dealer.score >= 17 &&
          player.score === dealer.score &&
          dealer.score < 21
        ) {
          gameOver = true;
          await endMsg("It's a tie!", "We both got the same score!", true);
        }
      }

      function dealerDraw() {
        dealer.cards.push(deck.deckArray[numCardsPulled]);
        dealer.score = getCardsValue(dealer.cards);
        numCardsPulled += 1;
      }

      function newGame() {
        hit();
        hit();
        dealerDraw();
        endGame();
      }

      function hit() {
        player.cards.push(deck.deckArray[numCardsPulled]);
        player.score = getCardsValue(player.cards);

        numCardsPulled += 1;
        if (numCardsPulled > 2) {
          endGame();
        }
      }

      function stand() {
        while (dealer.score < 17) {
          dealerDraw();
        }
        endGame();
      }

      newGame();
      async function loop() {
        if (gameOver) return;

        endMsg(
          "BlackJack",
          "Respond with `H` to hit\nRespond with `S` to stand",
          false
        );

        let filter = (m) => m.author.id === message.author.id;
        message.channel
          .awaitMessages(filter, {
            max: 1,
            time: 1200000,
            errors: ["time"],
          })
          .then((message) => {
            message = message.first();
            if (message.content.toLowerCase() === "h") {
              hit();
              loop();
              return;
            } else if (message.content.toLowerCase() === "s") {
              stand();
              loop();
              return;
            } else {
              bet("perder");
              return;
            }
          })
          .catch((_) => {
            message.channel.send("**You lost all your money**");
            bet("lose");
            return;
          });
      }

      await loop();
    }
  },
};
