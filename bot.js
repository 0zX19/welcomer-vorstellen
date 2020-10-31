const Discord = require("discord.js");
const client = new Discord.Client(({ partials: ['MESSAGE'] }))
const PREFIX = "=";
const jimp = require('jimp');
const db = require('quick.db');
const snekfetch = require('snekfetch');
const { Canvas } = require("canvas-constructor")
const fetch = require('node-fetch');
require("./server.js");

const axios = require("axios")
function uptime() {
setInterval(() => {
axios.get("https://welcome-sanskuy.glitch.me")},6000)
}
uptime()

var bot = new Discord.Client();

// APIP GANS
client.on('message', async message => {
  
    if (!message.guild) return;
    if (message.author.bot) return;
    if (!message.content.startsWith(PREFIX)) return;
  
  let msg = message.content.toLowerCase();
    let args = message.content.slice(PREFIX.length).trim().split(" ");
    let cmd = args.shift().toLowerCase();
  let command = cmd
  
  //command handler
  try {
    let commandFile = require(`./commands/${cmd}.js`);
    commandFile.run(client, message, args)
} catch(e) {
  
}
  try {
      
      client.commands.get(command).execute(message, args);
    } catch (error) {
      
    } 
  
});

client.login(process.env.TOKEN);

const { MessageEmbed } = require('discord.js');

client.on("guildMemberAdd", (member) => {
  let chx = db.get(`welcomechannel_${member.guild.id}`);
  
  if(chx === null) {
    return;
  }
  let wembed = new MessageEmbed()
  .setColor("BLACK")
  .setThumbnail(member.user.avatarURL())
  //.setDescription(`**__WELCOME TO ESG | SK24H__**`)
  .addField(`👋 Hi ${member.user.tag}`,`
[``BE GOOD HAPPY``]
welcome to VORSTELLEN !
Please wait for 3 minutes before you can post anything and join voice/text channels we provide. You can check out <#772169077992456223> while you are waiting.

▬ Feel free to introduce yourself briefly at
[<#772169077992456223>]
▬ You can also assign a few roles by yourself at
[<#772169077992456223>, <#772169077992456223>]
▬ General Chat is
[<#772169077992456223>]`)
  .setImage("https://media.giphy.com/media/shoyyCDlL9CTzXNpgM/giphy.gif")
  .setFooter(`ID MEMBER: ${member.user.id}`, member.user.avatarURL())
  client.channels.cache.get(chx).send(wembed).then(msg => msg.delete({ timeout: 20000 }))
})

// client.on("guildMemberRemove", (member) => {
//   let chx = db.get(`byechannel_${member.guild.id}`);
  
//   if(chx === null) {
//     return;
//   }

//   let wembed2 = new MessageEmbed()
//   .setAuthor(`📤 GoodBye ${member.user.username}`, client.user.avatarURL())
//   .setColor("RANDOM")
//   .setThumbnail(member.user.avatarURL())
//   .setDescription("Hey Kemana Kok pergi 😪")
//   .setFooter(`${member.user.id}`)
//   client.channels.cache.get(chx).send(wembed2)
// })

// const timezone = require("moment-timezone");
// client.on("ready", () => {
//     console.log(`${client.user.tag} Yo this ready!`);

//     function botStatus() {
//         timezone.locale("id");
//         let waktu2 = client.channels.cache.find(x => x.id === "740357653339045969");
//         waktu2.setName(`📆 ${timezone().tz("Asia/Jakarta").format("dddd, D MMM YYYY") + " "}`);
//     }
//     setInterval(botStatus, 10000);
// });

// ======= STATUS BOT ====== \\
client.on("ready", message => {
console.log(`BOT SUDAH ON ${client.guilds.cache.size} SERVER !!`);
 
//     const status = [
//       `x,help`
//      ];
// setInterval(setpress, 8000);
  
// function setpress(){
// var random = Math.floor(Math.random() * status.length);

//       client.user.setActivity(status[random],{
//         url: "https://www.youtube.com/watch?v=S2IYCZnhHcg",type: "LISTENING"
//     });
//   }
});

// client.on('message', async message => {
//     const { MessageEmbed } = require('discord.js')
//     let embed = new MessageEmbed()
//     .setAuthor(`👋 Hai ${message.author.username}`, client.user.avatarURL())
//     .setThumbnail(client.user.avatarURL())
//     .setColor("BLACK")
//     .addField("**Prefix saya adalah**",  `\`${PREFIX}\``)
//     if (message.content === `<@!${client.user.id}>` ||  message.content === `<@${client.user.id}>`)
//     return message.channel.send(embed);
//   });

// client.snipes = new Map()
// client.on('messageDelete', function(message, channel){
  
//   client.snipes.set(message.channel.id, {
//     content:message.content,
//     author:message.author.tag,
//     image:message.attachments.first() ? message.attachments.first().proxyURL : null
//   })
  
// })

// const usersMap = new Map();
// const LIMIT = 5;
// const TIME = 2000;
// const DIFF = 1000;

// client.on('message', message => {
//   if(message.author.bot) return;
//   if(usersMap.has(message.author.id)) {
//     const userData = usersMap.get(message.author.id);
//     const { lastMessage, timer } = userData;
//     const difference = message.createdTimestamp - lastMessage.createdTimestamp;
//     let msgCount = userData.msgCount;
//     console.log(difference);
//     if(difference > DIFF) {
//       clearTimeout(timer);
//       console.log('Cleared timeout');
//       userData.msgCount = 1;
//       userData.lastMessage = message;
//       userData.timer = setTimeout(() => {
//         usersMap.delete(message.author.id);
//         console.log('Removed from RESET.');
//       }, TIME);
//       usersMap.set(message.author.id, userData);
//     }
//     else {
//       ++msgCount;
//       if(parseInt(msgCount) === LIMIT) {
//         const role = message.guild.roles.cache.get('716423024869507093');
//         message.member.roles.add(role);
//         message.channel.send('You have been muted.');
//         setTimeout(() => {
//           message.member.roles.remove(role);
//           message.channel.send('You have been unmuted');
//         }, TIME);
//       } else {
//         userData.msgCount = msgCount;
//         usersMap.set(message.author.id, userData);
//       }
//     }
//   }
//   else {
//     let fn = setTimeout(() => {
//       usersMap.delete(message.author.id);
//       console.log('Removed from map.');
//     }, TIME);
//     usersMap.set(message.author.id, {
//       msgCount: 1,
//       lastMessage: message,
//       timer: fn
//     });
//   }
// });

// const fs = require('fs').promises;
// client.login(process.env.BOT_TOKEN);

// const createCaptcha = require('./captcha');
// client.on('guildMemberAdd', async member => {
//     const captcha = await createCaptcha();
//     try {
//         const msg = await member.send('You have 60 seconds to solve the captcha', {
//             files: [{
//                 attachment: `${__dirname}/captchas/${captcha}.png`,
//                 name: `${captcha}.png`
//             }]
//         });
//         try {
//             const filter = m => {
//                 if(m.author.bot) return;
//                 if(m.author.id === member.id && m.content === captcha) return true;
//                 else {
//                     m.channel.send('You entered the captcha incorrectly.');
//                     return false;
//                 }
//             };
//             const response = await msg.channel.awaitMessages(filter, { max: 1, time: 20000, errors: ['time']});
//             if(response) {
//                 await msg.channel.send('You have verified yourself!');
//                 await member.roles.add('714160394045751306');
//                 await fs.unlink(`${__dirname}/captchas/${captcha}.png`)
//                     .catch(err => console.log(err));
//             }
//         }
//         catch(err) {
//             console.log(err);
//             await msg.channel.send('You did not solve the captcha correctly on time.');
//             await member.kick();
//             await fs.unlink(`${__dirname}/captchas/${captcha}.png`)
//                     .catch(err => console.log(err));
//         }
//     }
//     catch(err) {
//         console.log(err);
//     }
// });