const Helper = require("../../Utils/Helper");
const ms = require("ms");
const PM = require("../../Managers/PenalManager");
const Penal = require("../../Models/Database/Penal");
const {Client, Message} = require("discord.js");
const Settings = require("../../Configuration/Settings.json");
const Discord = require("discord.js");
const moment = require("moment");

/**
 * @param {Client} client 
 * @param {Message} message 
 * @param {Array<String>} args 
 */
module.exports.execute = async (client, message, args) => {
    if(!message.member.hasPermission("ADMINISTRATOR") && !Settings.Penals.Jail.AuthRoles.some(authRole => message.member.roles.cache.has(authRole))) return message.channel.send(new Discord.MessageEmbed()
    .setDescription(`**<a:galaxy_morate:922918261136457789>  Bu Komutu Kullanmak İçin \`Jail\` Yetkin Olması Gerekiyor Canım!**   :x: `)
    .setFooter(`✶ BOT Developed by Mehmetbey`)
    .setColor('RANDOM')
    .setThumbnail(message.author.avatarURL({ dynamic: true, size: 2048 })))

    let victim = message.mentions.users.first() || client.users.cache.get(args[0]) || await Helper.GetUser(args[0]);
    if(!victim) return message.channel.send(new Discord.MessageEmbed()
    .setDescription(`**<a:galaxy_morate:922918261136457789>  Kime Kelepçe Takıp \`Hapise\` Atıyoruz Canım Etiket Atta Halledek!**   :x: \n\n\<a:galaxy_morate:922918261136457789> **g.geçicijail __@MehmetBey 3day DENEME__** `)
    .setFooter(`✶ BOT Developed by Mehmetbey`)
    .setColor('RANDOM')
    .setThumbnail(message.author.avatarURL({ dynamic: true, size: 2048 })))

    let time = args[1];
    if(!time || !ms(time)) return message.reply("<a:galaxy_morate:922918261136457789> **Geçerli Bir Süre Girmen Gerekiyor!** ✅ ** | __1day-3day-7day__ | **");
    time = ms(time);
    let reason = args.splice(2).join(" ");
    if(!reason) return message.channel.send(new Discord.MessageEmbed()
    .setDescription(`**<a:galaxy_morate:922918261136457789>  Neden \`Hapise\` Atıyoruz kanka Etiketten Sonra Sebep Belirtcen!**   :x:`)
    .setFooter(`✶ BOT Developed by Mehmetbey`)
    .setColor('RANDOM')
    .setThumbnail(message.author.avatarURL({ dynamic: true, size: 2048 })))

    let member = await message.guild.getMember(victim.id);
    if(member && member.roles.highest.position >= message.member.roles.highest.position) return message.channel.send(new Discord.MessageEmbed()
    .setDescription(`**<a:galaxy_morate:922918261136457789>  \`Hapise\` Atmaya Çalıştığın Kişi Senle Aynı Konumda veya Yüksek İyi Bak!**   :x:`)
    .setFooter(`✶ BOT Developed by Mehmetbey`)
    .setColor('RANDOM')
    .setThumbnail(message.author.avatarURL({ dynamic: true, size: 2048 })))

    if(member && member.manageable) PM.setRoles(member, Settings.Penals.Jail.Role).catch();

    let document = await PM.addPenal(victim.id, message.author.id, PM.Types.TEMP_JAIL, reason, true, Date.now(), time);

    message.channel.send(new Discord.MessageEmbed()
    .setDescription(`${victim} Üyesi ${message.author} Tarafından **| ${reason} |** Sebebiyle Geçici Süre Cezalandırıldı. **(Ceza No:** \`#${document.Id}\`)`)
    .setFooter(`✶ BOT Developed by Mehmetbey`)
    .setColor('RANDOM')
    .setThumbnail(message.author.avatarURL({ dynamic: true, size: 2048 })))
    message.guild.log(message.author, victim, document, Settings.Penals.Jail.Log);
}

module.exports.settings = {
    Commands: ["geçicijail", "geçicicezalandır"],
    Usage: "geçicijail <@user|id> <time> [reason]",
    Description: "Bahsettiğin kişiyi sunucuda belirttiğin süre boyunca geçici olarak cezalandırırsın.",
    Category: "Penal",
    Activity: true
}