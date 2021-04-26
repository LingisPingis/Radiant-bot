const figlet = require('figlet');

module.exports = {
    name: "ascii",
    description: "Converts text to ascii",

    async run (client, message, args, Discord) {
        if(!args[0]) return message.channel.send('Please provide some text');

        msg = args.join(" ");

        figlet.text(msg, function (err, data){
            if(err){
                console.log('Something went wrong');
                console.dir(err);
            }
            if(data.length < 15) return message.channel.send('Please provide text shorter than 15 characters as the text can distort otherwise.')
            message.delete()
            message.channel.send('```' + data + '```')
        })
    }
}