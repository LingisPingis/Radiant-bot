module.exports = {
    name: 'order-lookup',
    aliases: ['order', 'orderinfo', 'order-info'],
    async run(client, message, args, Discord) {

        return
        
        const Shoppy = require('Shoppy.gg');

        const API = new Shoppy.API("hJ0QoAs4NdNvU2pJ3VRgLukcSFlZvmaRAZUWhzd7Poq28C2gu6")
        // This function returns information about a specific order based on it's ID.
        const colors = require('../../colors.json')

        if (!args[0]) return message.channel.send("Please provide a valid order id!")

        API.getSpecificOrder(args[0])
            .then(data => { })
            .catch(items => {
                const embed = new Discord.MessageEmbed()
                    .setTitle(`Order details for ${args[0]}`)
                    .setColor(colors.purple)
                    .setThumbnail(message.guild.iconURL({ dynamic: true }))
                    .addField("Product", items.product.title, true)
                    .addField("Price", items.price + " " + items.currency, true)
                    .addField("Email", items.email, true)
                    .addField("Delivered", items.delivered, true)
                    .addField("Payment", items.gateway, true)
                    .addField("Paid At", items.paid_at, true)
                    .addField("Country", items.agent.geo.country, true)
                    .addField("Timezone", items.agent.geo.timezone, true)
                    .addField("Continent", items.agent.geo.continent, true)
                    .addField("Customer IP", "||" + items.agent.geo.ip + "||")
                message.channel.send(embed);
            });

        // This funtion returns all feedback left on your profile.
        /*
       API.getFeedback()
         .then(data => {})
         .catch(items => {
           message.channel.send("\n" + items);
         });*/
    }
}