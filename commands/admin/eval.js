module.exports = {
    name: 'eval',
    alises: [],
    async run(client, message, args, Discord) {

        if(!message.author === '611978487066263582') return message.channel.send("Only Lingen can use this command!")
        const content = message.content.split(" ").slice(1).join(" ");
        const result = new Promise((resolve) => resolve(eval(content)));

        return result.then((output) => {
            if (typeof output !== "string") {
                output = require("util").inspect(output, {
                    depth: 0
                });
            }
            if (output.includes(client.token)) {
                output = output.replace(client.token, "T0K3N");
            }
            message.channel.send(output, {
                code: "js"
            });
        }).catch((err) => {
            err = err.toString();
            if (err.includes(client.token)) {
                err = err.replace(client.token, "T0K3N");
            }
            message.channel.send(err, {
                code: "js"
            });
        });

    }
}