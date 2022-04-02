const {Client, Message} = require("discord.js");
const settings = require("../../Configuration/settings.json");
const Helper = require("../../Utils/Helper");
const PM = require("../../Managers/PenalManager");
const Discord = require("discord.js");
const moment = require("moment");
require("moment-duration-format");
require("moment-timezone");
const banLimit = new Map();
const Penal = require("../../Models/Database/Penal");
const banlimit = new Map();


/**
 * @param {Client} client 
 * @param {Message} message 
 * @param {Array<String>} args 
 */
 module.exports.execute = async (client, message, args) => {
  if (settings.banlimit > 0 && banlimit.has(message.author.id) && banlimit.get(message.author.id) == settings.banlimit) return message.channel.send("Ban Sınırına Ulaştın! MehmetBey ile Veya Sunucu Kurucuları ile İletişime ").then(x=>x.delete({timeout:5000}))
    if(!message.member.hasPermission("ADMINISTRATOR") && !settings.Penals.Ban.AuthRoles.some(authRole => message.member.roles.cache.has(authRole))) return message.channel.send(new Discord.MessageEmbed()
    .setDescription(`**<a:galaxy_banned:923233509248749648>  Bu Komutu Kullanmak İçin Ban Yetkin Olması Gerekiyor Canım!**`)
    .setFooter(`✶ BOT Developed by Mehmetbey`)
    .setColor('RANDOM')
    .setThumbnail(message.author.avatarURL({ dynamic: true, size: 2048 })))

    let victim = message.mentions.users.first() || client.users.cache.get(args[0]) || await Helper.GetUser(args[0]);
    if(!victim) return message.channel.send(new Discord.MessageEmbed()
    .setDescription(`**<a:galaxy_banned:923233509248749648> Kimi Sunucudan Uçuruyoruz Kanka Etiket Atta Halledek!**\n\n\ <a:galaxy_banned:923233509248749648> **g.ban @Etiket [Sebep]**`)
    .setFooter(`✶ BOT Developed by Mehmetbey`)
    .setColor('RANDOM')
    .setThumbnail(message.author.avatarURL({ dynamic: true, size: 2048 })))
    
    
    let reason = args.splice(1).join(" ");
    if(!reason) return message.channel.send(new Discord.MessageEmbed()
    .setDescription(`**<a:galaxy_banned:923233509248749648>  Neden Ban Atıyoruz kanka Etiketten Sonra Sebep Belirtcen!**\n\n\ <a:galaxy_banned:923233509248749648> **g.ban @MehmetBey [Sebep]**`)
    .setFooter(`✶ BOT Developed by Mehmetbey`)
    .setColor('RANDOM')
    .setThumbnail(message.author.avatarURL({ dynamic: true, size: 2048 })))

    let member = await message.guild.getMember(victim.id);
    if(member && member.roles.highest.position >= message.member.roles.highest.position) return message.channel.send(new Discord.MessageEmbed()
    .setDescription(`**<a:galaxy_banned:923233509248749648> Ban Atmaya Çalıştığın Kişi Senle Aynı Konumda veya Yüksek İyi Bak!**`)
    .setFooter(`✶ BOT Developed by Mehmetbey`)
    .setColor('RANDOM')
    .setThumbnail(message.author.avatarURL({ dynamic: true, size: 2048 })))

    if(member && !member.bannable) return message.reply("bu kişiyi yasaklayamıyorum.")
    message.guild.members.ban(victim.id, {
        reason: `Yasaklayan kişi ${message.author.username}`
    }).catch();

    let document = await PM.addPenal(victim.id, message.author.id, PM.Types.BAN, reason);
    message.channel.send(new Discord.MessageEmbed()
    .setDescription(`${victim} Üyesi ${message.author} Tarafından **| ${reason} |** Sebebiyle Sunucudan Yasaklandı. (**Ceza No:** \`#${document.Id}\`)`)
    .setFooter(`✶ BOT Developed by Mehmetbey`)
    .setColor('RANDOM')
    .setImage("https://media4.giphy.com/media/9zZKwOtDCN3N4qR2CN/giphy.gif?cid=ecf05e47e61h9mq3nvubjxqu3pcgx45g9szent710e6lr0ts&rid=giphy.gif&ct=g")
    .setThumbnail(message.author.avatarURL({ dynamic: true, size: 2048 })))

    message.guild.log(message.author, victim, document, settings.Penals.Ban.Log);
    if (settings.banlimit > 0) {
      if (!banLimit.has(message.author.id)) banLimit.set(message.author.id, 1);
      else banLimit.set(message.author.id, banLimit.get(message.author.id) + 1);
      setTimeout(() => {
        if (banLimit.has(message.author.id)) banLimit.delete(message.author.id);
      }, 1000 * 60 * 60 * 24 );
    }
  }


module.exports.settings = {
    Commands: ["ban", "cezalandır"],
    Usage: "ban <@user|id> [reason]",
    Description: "Bahsettiğin kişiyi sunucudan yasaklarsın.",
    Category: "Penal",
    Activity: true
}
