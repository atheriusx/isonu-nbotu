
const Discord = require("discord.js");
const cooldown = new Set();







exports.run = async (client, message, args, ayar ) => {
    let boosterrol = "920006111778705489"
	let vipRol = "878576843563872307"
    let kanalid = "878576846508265478" 
    let renk = "RANDOM" 
    let tag = "✶" 

    


    if(cooldown.has(message.author.id)) {
      message.reply('Kardeşim Hergün isim mi değiştircen 1 Gün bekle Gari <3')
    } else {
      if(!message.member.roles.cache.has(boosterrol) && !message.member.roles.cache.has(vipRol)) return message.channel.send(`**Bu komutu kullanabilmek için \`🚀 ✶ Galaxy Booster\` Veya \`⚔️ ✶ VİP\` Rolüne Sahip Olman Gerekiyor! **`)
      if(message.channel.id !== kanalid) return message.channel.send(new Discord.MessageEmbed()
  .setAuthor(message.author.tag,  message.author.avatarURL({dynamic: true}))
  .setColor(renk)
      .setDescription(`**\`✶\` <@${message.author.id}>, bu komutu sadece <#${kanalid}> kanalin da kullanabilirsin.**`)
  .setFooter(`✶ BOT Developed by Mehmet Bey`, "https://cdn.discordapp.com/emojis/785950806384836619.gif?v=1%22"))
  
    let boosternick = args.slice(0).join(' ')
    if(!boosternick) return message.reply("Yeni Kullanıcı Adını Gir de Değiştireyim Kanka <3.")
    message.member.setNickname(`${tag} ${boosternick}`)
      const Savage = new Discord.MessageEmbed()
      .setAuthor(message.author.tag,  message.author.avatarURL({dynamic: true}))
      .setColor(renk)
      .setDescription(`**\`✶ Galaxy\` Takma adını başarıyla \`${tag} ${boosternick}\` olarak değiştirildi.**`) 
      .setFooter(`✶ BOT Developed by MehmetBey`, "https://cdn.discordapp.com/emojis/785950806384836619.gif?v=1%22")
      message.channel.send(Savage)
       
      cooldown.add(message.author.id);
      setTimeout(() => {
        cooldown.delete(message.author.id)
      }, 86400000)
    }
    
}

exports.conf = {
    name: "boosterisim",
    aliases: ["isimdeğiştir"],
    enabled: true,
    guildOnly: true
};

exports.help = { 
    name: 'boosterisim', 
    description: 'Boost basanlar isim sag tiksiz degise bilcek.',
    usage: 'isimdeğiştir <isim>',
    kategori: 'kullanıcı'
};

