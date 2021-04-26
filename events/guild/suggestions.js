module.exports = async (Discord, client, message) => {

    const db = require('quick.db');
    const emojis = client.emojis

    let channel = 'some value that will change later';
    channel = db.get(`suggestions_${message.guild.id}`, channel)
    if(!db.get(`suggestions_${message.guild.id}`, channel)) return
    
    const suggestions = message.guild.channels.cache.get(channel)
    if(!suggestions) return;

    if (message.channel.id === channel) {
        message.react(emojis.success).catch(err => err)
        await message.react(emojis.fail).catch(err => err)
    }
}