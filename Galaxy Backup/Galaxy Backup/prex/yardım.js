const dc = require("discord.js")

exports.run = async (client, message, args) => {
  let embed = new dc.MessageEmbed()
  .setTitle("Yedek Sistemi")
  .setDescription(`
  
  Galaxy Sunucumuzun Yedeklerini Oluştur ve Yükle ✅
  
  **Komutlar** **( ✶ )**
  **[g.yedek-al](https://discord.com/oauth2/authorize?client_id=${client.user.id}&scope=applications.commands+bot&permissions=8)**   ✶ Yedek Alırsınız.
  **[g.yedek-yükle](https://discord.com/oauth2/authorize?client_id=${client.user.id}&scope=applications.commands+bot&permissions=8)**   ✶ Yedeği Yüklersiniz.
  **[g.yedek-sil](https://discord.com/oauth2/authorize?client_id=${client.user.id}&scope=applications.commands+bot&permissions=8)**   ✶ Yedek Silersiniz.
  **[g.yedek-liste](https://discord.com/oauth2/authorize?client_id=${client.user.id}&scope=applications.commands+bot&permissions=8)**   ✶ Yedek Listenize Bakarsınız.
  **[g.yedek-bilgi](https://discord.com/oauth2/authorize?client_id=${client.user.id}&scope=applications.commands+bot&permissions=8)**  ✶  Belirttiğiniz Yedeğin Özelliklerine Bakarsınız.
  `)
  .setImage("https://media.discordapp.net/attachments/509387460900421632/814066266511245372/galaxy-v2-mavi.png?width=630&height=355")
  .setColor("GREEN")
  .setFooter(`✶ BOT Developed by Mehmet Bey`)
  message.channel.send(embed)
  }