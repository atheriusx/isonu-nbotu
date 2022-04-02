const {Client, Message} = require("discord.js");
const Settings = require("../../Configuration/Settings.json");
const Helper = require("../../Utils/Helper");
const Discord = require("discord.js");
const ms = require("ms");

const PM = require("../../Managers/PenalManager");

/**
 * @param {Client} client 
 * @param {Message} message 
 * @param {Array<String>} args 
 */
module.exports.execute = async (client, message, args) => {
    if(!message.member.hasPermission("ADMINISTRATOR") && !Settings.Penals.Mute.AuthRoles.some(authRole => message.member.roles.cache.has(authRole))) return message.channel.send(new Discord.MessageEmbed()
    .setDescription(`**<:galaxy_mute:924583861533433876>  Bu Komutu Kullanmak İçin \`Mute\` Yetkin Olması Gerekiyor Canım!**   :x: `)
    .setFooter(`✶ BOT Developed by Mehmetbey`)
    .setColor('RANDOM')
    .setThumbnail(message.author.avatarURL({ dynamic: true, size: 2048 })))

    let victim = message.mentions.users.first() || client.users.cache.get(args[0]) || await Helper.GetUser(args[0]);
    if(!victim) return message.channel.send(new Discord.MessageEmbed()
    .setDescription(`**<a:galaxy_morate:922918261136457789>  Kimi \`Yazı Kanallarından\` Engelliyoruz, Etiket Atta Halledek!**   :x: `)
    .setFooter(`✶ BOT Developed by Mehmetbey`)
    .setColor('RANDOM')
    .setThumbnail(message.author.avatarURL({ dynamic: true, size: 2048 })))
    
    let time = args[1];
    if(!time || !ms(time)) return message.reply("<a:galaxy_morate:922918261136457789> **\`Geçerli Bir Süre Girmen Gerekiyor!\`** ✅");
    time = ms(time);
    
    let reason = args.splice(2).join(" ");
    if(!reason) return message.channel.send(new Discord.MessageEmbed()
    .setDescription(`<a:galaxy_morate:922918261136457789>  **Bu İnsan Evladını Neden \`Yazı Kanallarından\` Engelliyoruz, Sebep Belirt!**   :x:`)
    .setFooter(`✶ BOT Developed by Mehmetbey`)
    .setColor('RANDOM')
    .setThumbnail(message.author.avatarURL({ dynamic: true, size: 2048 })))

    let member = await message.guild.getMember(victim.id);
    if(member && member.roles.highest.position >= message.member.roles.highest.position) return message.channel.send(new Discord.MessageEmbed()
    .setDescription(`<a:yygalaxytag_2:838556796888154143> **Komut Kullandığın Kişi Senle Aynı Rolde veya Yüksek!** `)
    .setFooter(`✶ BOT Developed by Mehmetbey`)
    .setColor('RANDOM')
    .setThumbnail(message.author.avatarURL({ dynamic: true, size: 2048 })))

    if(member && member.manageable && !member.roles.cache.has(Settings.Penals.Mute.Role)) member.roles.add(Settings.Penals.Mute.Role).catch();

    let document = await PM.addPenal(victim.id, message.author.id, PM.Types.TEMP_MUTE, reason, true, Date.now(), time);

    message.channel.send(new Discord.MessageEmbed()
    .setDescription(`${victim} Kullanıcısı ${message.author} Tarafından **| ${reason} |** Sebebiyle Geçici Olarak \`Yazı Kanallarından\` Susturuldu. **Ceza No:** \`#${document.Id}\``)
    .setFooter(`✶ BOT Developed by Mehmetbey`)
    .setColor('RANDOM')
    .setThumbnail(message.author.avatarURL({ dynamic: true, size: 2048 })))

    message.guild.log(message.author, victim, document, Settings.Penals.Mute.Log);
}

module.exports.settings = {
    Commands: ["chatmute", "geçicisustur"],
    Usage: "chatmute <@user|id> <time> [reason]",
    Description: "Bahsettiğin kişiyi sunucuda geçici olarak yazılı susturursun.",
    Category: "Penal",
    Activity: true
}