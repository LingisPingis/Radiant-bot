const client = require('nekos.life');
const neko = new client();


module.exports = {
    name: "fact",
    description: "sends a random fact",
    run(client, message, args, Discord) {
        //command

        async function work() {

            let owo = (await neko.sfw.fact());
            message.channel.send(owo.fact).catch(error => {
                console.error(error);
            });

        }

        work();
    }
};