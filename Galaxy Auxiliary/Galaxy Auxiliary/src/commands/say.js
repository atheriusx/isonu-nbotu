const Discord = require("discord.js");
exports.run = async (client, message, args) => {       
let Tag = "✶"
let ServerName = "GALAXY"
let BoosterRole =  "920006111778705489" 

          var TotalMember = message.guild.memberCount
          var Online = message.guild.members.cache.filter(off => off.presence.status !== 'offline').size;
          var Taglı = message.guild.members.cache.filter(u => u.user.username.includes(Tag)).size;
          var Voice = message.guild.members.cache.filter(s => s.voice.channel).size;
          var Boost = message.guild.premiumSubscriptionCount;
          const arxEmbed = new Discord.MessageEmbed()
              .setFooter(`✶ BOT Developed by Mehmet Bey`)
              .setColor("RANDOM")
              .setAuthor(`${message.guild.name}`,message.guild.iconURL())
              .setDescription(`
              <a:galaxy_okluparlakyldz:923233509668188191>   **Sunucumuzda Toplam   ${client.emojili(`${TotalMember}`)}   Kişi Bulunmakta.**\n
              <a:galaxy_okluparlakyldz:923233509668188191>  **Sunucumuzda Toplam   ${client.emojili(`${Online}`)}   Aktif Kişi Bulunmakta.**\n
              <a:galaxy_okluparlakyldz:923233509668188191>   **Tagımızda Toplam   ${client.emojili(`${Taglı}`)}   Kişi Bulunmakta.**\n
              <a:galaxy_okluparlakyldz:923233509668188191>  **Ses Kanallarında Toplam   ${client.emojili(`${Voice}`)}   Kişi Bulunmakta.**\n
              <a:galaxy_okluparlakyldz:923233509668188191>   **Sunucuda Toplam   ${client.emojili(`${Boost}`)}   Boost Takviyesi Bulunmakta.**\n
`)
message.channel.send(arxEmbed)

}
module.exports.conf = {
  name: "say",
    aliases: ["say"],
    usage: "say",
    description: "MehmetBey tarafından hazırlanmıştır."
};