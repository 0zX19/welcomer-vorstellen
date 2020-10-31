const db = require('quick.db');
const fetch = require('node-fetch');

module.exports = {
    config: {
        name: 'disablewelcome',
        aliases: ['dwc', 'dw', 'disablewc'],
        category: 'moderation',
        description: 'Disables Server Welcome Channel',
        usage: '[channel name | channel ID | channel mention]',
        accessableby: 'Administrators'
    },
    run: async (bot, message, args) => {
        message.delete()
        if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("**You Do Not Have The Required Permissions! - [ADMINISTRATOR]**")

        try {
            let a = db.fetch(`welcomechannel_${message.guild.id}`)

            if (!a) {
                return message.channel.send("**There Is No Welcome Channel Set To Disable!**").then(msg => msg.delete({ timeout: 2000 }))
            } else {
                let channel = message.guild.channels.cache.get(a)
                bot.guilds.cache.get(message.guild.id).channels.cache.get(channel.id).send("**Welcome Channel Disabled!**").then(msg => msg.delete({ timeout: 2000 }))
                db.delete(`welcomechannel_${message.guild.id}`)

                message.channel.send(`**Welcome Channel Has Been Successfully Disabled in \`${channel.name}\`**`).then(msg => msg.delete({ timeout: 2000 }))
            }
            return;
        } catch {
            return message.channel.send("**Error - `Missing Permissions or Channel Doesn't Exist`**")
        }
    }
}