module.exports = {
    name: 'settings',
    aliases: ["setting", "configuration", "config", "settings"],

    async run(client, message, args, Discord) {

        if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("Only server administrators can use this command!")
        const db = require('quick.db')
        const configuration = require('./config');
        const colors = client.colors

        if (!args[0]) configuration(client, message, args, Discord, db);

        if (args[0] === 'buyerchannel' || args[0] === 'buyerChannel' || args[0] === 'buyerrequest') {
            const buyer = require('./buyerchannel');
            buyer(client, message, args, Discord, db);
        }
        if (args[0] === 'prefix') {
            const prefix = require('./prefix');
            prefix(client, message, args, Discord, db);
        }
        if (args[0] === 'welcome') {
            const welcome = require('./welcome');
            welcome(client, message, args, Discord, db);
        }
        if (args[0] === 'suggestions') {
            const suggestions = require('./suggestions');
            suggestions(client, message, args, Discord, db);
        }
        if (args[0] === 'invites') {
            const invites = require('./invDelete');
            invites(client, message, args, Discord, db);
        }
        if (args[0] === 'modlogs') {
            const modLogs = require('./modLogs');
            modLogs(client, message, args, Discord);
        }
        if (args[0] === 'captcha') {
            const captcha = require('./captcha');
            captcha(client, message, args, Discord, db);
        }
        if (args[0] === 'membercount') {
            const memCount = require('./memCount');
            memCount(client, message, args, Discord, db);
        }
        if (args[0] === 'autorole') {
            const autoRole = require('./autoRole');
            autoRole(client, message, args, Discord, db);
        }
        if (args[0] === 'boosts' || args[0] === 'boostcounter') {
            const boosts = require('./boosts');
            boosts(client, message, args, Discord, db);
        }
        if (args[0] === 'deletemodcmds' || args[0] === 'delmod' || args[0] === 'delmodcmds' || args[0] === 'delmodcmd') {
            const mod = require('./modDelete');
            mod(client, message, args, Discord, db);
        }
        if (args[0] === 'currency') {
            const currency = require('./currency');
            currency(client, message, args, Discord, db);
        }

        if (args[0] === 'updates') {
            const updates = require('./updates');
            updates(client, message, args, Discord, db);
        }
        if (args[0] === "buyerrole") {
            const buyerrole = require('./buyerrole');
            buyerrole(client, message, args, Discord, db);
        }
    }
}