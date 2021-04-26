module.exports = {
    name: 'shop',
    aliases: [],

    async run(client, message, args, Discord, db) {

        const emojis = require('../../assets/emojis.json')
        const colors = client.colors

        let prefix = 'a'
        prefix = db.get(`prefix`, prefix)
        let currency = '1'
        currency = db.get(`currency`, currency)
        if (!currency) {
            currency = '$'
        }

        let pages = 2

        const shopEmbed = new Discord.MessageEmbed()
            .setTitle(`Shop`)
            .setFooter(`Page 1/${pages}\nTo purchase any item do ${prefix}buy <item id>`)
            .addField(emojis.shop.excalibur + ` Excalibur [excalibur]`, `**${currency}999,999,999**\nA holy sword, deals 500 damage to your opponent and can give you random power-ups during battle.`)
            .addField(emojis.shop.gamer_sword + ` Gamer Sword [gsword]`, `**${currency}500,000,000**\nThe most gamery sword to exist, deals 350 damage during battle.`)
            .addField(emojis.shop.blue_sword + ` Sword [sword]`, `**${currency}250,000,000**\nA very strong sword, deals 300 damage during battle.`)
            .addField(emojis.shop.robot + " Auto-Miner [autominer]", `**${currency}750,000**\nA auto minder, can be used twice a day to mine ores and sell them.`)
            .addField(emojis.shop.sythe + " Sythe [sythe]", `**${currency}500,000**\nA weapon that has been passed down for generations, is too old to used for battle, can only be used for decoration.`)

        const shopEmbed2 = new Discord.MessageEmbed()
            .setTitle("Shop")
            .setFooter(`Page 2/${pages}\nTo purchase any item do ${prefix}buy <item id>`)
            .addField(emojis.shop.gun + " Gun [gun]", `**${currency}500,000**\nA weapon that can be used for hunting and battle, deals 100 damage to your opponent.`)
            .addField(emojis.shop.bitcoin + " Bitcoin [bcoin]", `**${currency}57,960**\n1 bitcoin, can be used for trading or investing.`)
            .addField(emojis.shop.etherium + " Etherium [eth]", `**${currency}32,436**\n1 Etherium, can be used for trading or investing.`)
            .addField(emojis.shop.healingpotion + " Healing Potion [healpt]", `**${currency}20,000**\nA healing potion, can be used if you have taken damge during a battle or a hunt.`)
            .addField(emojis.shop.dmgpotion + " Damage Potion [dmgpotion]", `**${currency}15,000**\nA damage potion, can be used to deal a small ammount of damage to your opponent in battle.`)

        const shopEmbed3 = new Discord.MessageEmbed()
        .setTitle("Shop")
        .setFooter(`Page 2/${pages}\nTo purchase any item do ${prefix}buy <item id>`)

        if (!args[0] || args[0] === '1') return message.channel.send(shopEmbed)
        if (args[0] === '2') return message.channel.send(shopEmbed2)
        if (args[0] === '3') return message.channel.send(shopEmbed3)

    }
}