const db = require("croxydb")
const dc = require("discord.js")

exports.run = async (client, message, args) => {
  let yedekler = await db.get(`y_${message.author.id}`)
  let sj;
  if(!yedekler) {
    sj = "Yedeğin Bulunmamakta"
    } else {
      sj = yedekler.map(x => `**${x.id}**\n${x.adı} (\`${x.tarih}\`)\n`)
      }
  let embed = new dc.MessageEmbed()
  .setTitle("📄 Yedek Listesi")
  .setColor("GREEN")
  .setTimestamp()
  .setThumbnail(message.author.avatarURL())
  .setDescription(sj)
  .setFooter(`✶ BOT Developed by Mehmet Bey`)
  .setImage("https://media.discordapp.net/attachments/827590539960254464/827675119606169610/ezgif.com-gif-maker_6.gif?width=299&height=205")
  message.channel.send(embed)
  }