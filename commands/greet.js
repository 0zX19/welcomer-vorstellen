const Discord = require("discord.js")
const db = require("quick.db")
const fetch = require('node-fetch');

module.exports = {
  name: "welcome",
  category: "moderation",
  usage: "setwelcome <#channel>",
  description: "Set the welcome channel",
  run: (client, message, args) => {
    message.delete()
    
    let channel = message.mentions.channels.first()
    
    if(!channel) {
      return message.channel.send("**Please Mention the channel first**").then(msg => msg.delete({ timeout: 2000 }))
    }
    
    //Now we gonna use quick.db
    
    db.set(`welcomechannel_${message.guild.id}`, channel.id)
    
    message.channel.send(`Welcome Channel is seted as ${channel}`).then(msg => msg.delete({ timeout: 2000 }))
  }
}
