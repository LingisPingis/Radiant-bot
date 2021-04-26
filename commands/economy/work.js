module.exports = {
    name: 'work',
    aliases: [],
    cooldown: 900000,
    async run(client, message, args, Discord, db) {

        const config = client.config
        const colors = client.colors
        const emojis = require('../../assets/emojis.json')

        let prefix = 'a'
        prefix = db.get(`prefix`, prefix)
        const noWork = new Discord.MessageEmbed()
            .setDescription(`Looks like you don't have a job! You can see available jobs via the **${prefix}jobs** command.`)
            .setColor(colors.red)

        let occupation = 'a'

        occupation = db.get(`userdata_${message.author.id}.jobs.occupation`)
        if (!occupation) return message.channel.send(noWork)
        if (occupation) {

            let money = 'money'
            if (occupation === 'Unemployed') {
                return message.channel.send(new Discord.MessageEmbed().setTitle("Unemployed!").setDescription("Please apply for a job before trying to work!").setColor(client.colors.red))
            }
            if (occupation === 'engeneer') {

                money = Math.floor(Math.random() * 3350) + 500;
                const idkPerson = require('./jobs/engeneer');
                idkPerson(client, message, args, Discord, db, money);
            }
            if (occupation === 'programmer') {

                money = Math.floor(Math.random() * 1700) + 500;
                const pro = require('./jobs/programmer');
                pro(client, message, args, Discord, db, money);
            }
            if (occupation === 'fisherman') {

                money = Math.floor(Math.random() * 500) + 250;
                const fish = require('./jobs/fisherman');
                fish(client, message, args, Discord, db, money);
            }
            if (occupation === 'mailman') {

                money = Math.floor(Math.random() * 350) + 200;
                const fish = require('./jobs/mailman');
                fish(client, message, args, Discord, db, money);
            }
            if (occupation === 'manager') {

                money = Math.floor(Math.random() * 5000) + 500;
                const fish = require('./jobs/manager');
                fish(client, message, args, Discord, db, money);
            }
            if (occupation === 'doctor') {

                money = Math.floor(Math.random() * 3800) + 500;
                const fish = require('./jobs/doctor');
                fish(client, message, args, Discord, db, money);
            }
            if (occupation === 'police') {

                money = Math.floor(Math.random() * 3000) + 500;
                const fish = require('./jobs/fisherman');
                fish(client, message, args, Discord, db, money);
            }
            if (occupation === 'fireman') {

                money = Math.floor(Math.random() * 2500) + 500;
                const fire = require('./jobs/fireman');
                fire(client, message, args, Discord, db, money);
            }
            if (occupation === 'ambulance') {

                money = Math.floor(Math.random() * 2300) + 500;
                const emf = require('./jobs/ambulance');
                emf(client, message, args, Discord, db, money);
            }

            let time = Math.floor(Math.random() * 11) + 5;

            if(db.get(`badwork_${message.author.id}`, true)) {
                return db.delete(`badwork_${message.author.id}`, true)
            }

            let c;
            c = db.get(`currency`, c)
            if(!c) c = "$"

            let worked = new Discord.MessageEmbed()
                .setTitle(`:office: Work`)
                .setDescription(`You worked for ${time} hours as a ${occupation} and earned ${c}${money}!`)
                .setColor(colors.dark_green)

            message.channel.send(worked)
        }
    }
}