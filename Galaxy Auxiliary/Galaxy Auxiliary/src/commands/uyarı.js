const Discord = require("discord.js");
const ayar = require("../configs/settings.json");
const db = require('quick.db');

module.exports.run = async(client, message, args, embed) => {
    if (!message.member.roles.cache.has("878576843563872314") && !message.member.hasPermission(8)) return;
    let member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
    let victim = message.guild.member(member)
    let sebep = args.slice(1).join(' ')
    if (!victim) return;
    if (!sebep) return message.reply('sebep belirt.')
    if (victim.id === client.user.id) return;
    if (victim.id === message.author.id) return;

let log = message.guild.channels.cache.get("878576845300330528")
let uyari1 = message.guild.roles.cache.get("878576843530326037")
let uyari2 = message.guild.roles.cache.get("878576843513552945")
let uyari3 = message.guild.roles.cache.get("878576843513552944") 

    let data = await db.get(`uyari.${victim.id}`)
    if (!data) {
        db.add(`uyari.${victim.id}`, 1)
        message.channel.send(embed
          .setFooter(`✶ BOT Developed by MehmetBey`)         
          .setDescription(`${victim} **Adlı Kullanıcı** **${sebep}** **Sebebiyle** ${message.member} **Tarafından İlk Uyarısını Aldı!**`))
    if(uyari1) victim.roles.add(uyari1.id)
    if (log) log.send(embed
      .setFooter(`✶ BOT Developed by Mehmet Bey`)
      
      .setDescription(`
    Bir Kullanıcı Uyarıldı!
    
    Kullanıcı; ${victim} - (\`${victim.id}\`)
    Yetkili; ${message.member} - (\`${message.member.id}\`)
    Sebep; \`${sebep}\``))


} else if (data === 1) {
        db.add(`uyari.${victim.id}`, 1)
        message.channel.send(embed
          .setFooter(`✶ BOT Developed by Mehmet Bey`)         
          .setDescription(`${victim} **Adlı Kullanıcı** **${sebep}** **Sebebiyle** ${message.member} **Tarafından** **2.** **Uyarısını Aldı!**`))
        if(uyari2) victim.roles.add(uyari2.id)
     if (log) log.send(embed
      .setFooter(`✶ BOT Developed by Mehmet Bey`)     
      .setDescription(`
    Bir Kullanıcı Uyarıldı!
    
    Kullanıcı; ${victim} - (\`${victim.id}\`)
    Yetkili; ${message.member} - (\`${message.member.id}\`)
    Sebep; \`${sebep}\``))
    



    } else if (data === 2) {
        db.add(`uyari.${victim.id}`, 1)
        message.channel.send(embed
          .setFooter(`✶ BOT Developed by Mehmet Bey`)        
          .setDescription(`${victim} **Adlı Kullanıcı** **${sebep}** **Sebebiyle** ${message.member} **Tarafından 3. Uyarısını Aldı!**`))
        if(uyari3) victim.roles.add(uyari3.id)
            if (log) log.send(embed             
              .setFooter(`✶ BOT Developed by Mehmet Bey`)
              .setDescription(`
        Bir Kullanıcı Uyarıldı!
        
        
        Kullanıcı; ${victim} - (\`${victim.id}\`)
        Yetkili; ${message.member} - (\`${message.member.id}\`)
        Sebep; \`${sebep}\``))
        



    } else if (data === 3) {
        await db.delete(`uyari.${victim.id}`)
        await message.channel.send(embed
          .setFooter(`✶ BOT Developed by Mehmet Bey`)         
          .setDescription(`${victim} **Adlı Kullanıcının Uyarı Sayısı** **3** **ve Üzeri Olduğu için Cezalıya Atıldı!**`))
          member.roles.set(["714648649753428039"])
    }


}
exports.conf = {
    name: "uyarı",
    guildOnly: true,
    aliases: [],
    cooldown: 0
};