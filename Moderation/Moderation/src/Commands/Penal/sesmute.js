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
    if(!message.member.hasPermission("ADMINISTRATOR") && !Settings.Penals.VoiceMute.AuthRoles.some(authRole => message.member.roles.cache.has(authRole))) return message.channel.send(new Discord.MessageEmbed()
    .setDescription(`**<:galaxy_vmute:924583872862228500>  Bu Komutu Kullanmak İçin \`Mute\` Yetkin Olması Gerekiyor Canım!**   💛 `)
    .setFooter(`✶ BOT Developed by Mehmetbey`)
    .setColor('RANDOM')
    .setThumbnail(message.author.avatarURL({ dynamic: true, size: 2048 })))

    let victim = message.mentions.users.first() || client.users.cache.get(args[0]) || await Helper.GetUser(args[0]);
    if(!victim) return message.channel.send(new Discord.MessageEmbed()
    .setDescription(`**<a:galaxy_morate:922918261136457789>  Kimi Seste Sustuyoruz \`Mute\` Atıyoruz Canım Etiket Atta Halledek!**   💙 `)
    .setFooter(`✶ BOT Developed by Mehmetbey`)
    .setColor('RANDOM')
    .setThumbnail(message.author.avatarURL({ dynamic: true, size: 2048 })))
    

    let time = args[1];
    if(!time || !ms(time)) return message.reply("<a:galaxy_morate:922918261136457789> **Geçerli Bir Süre Girmen Gerekiyor!** 🔴");
    time = ms(time);
    let reason = args.splice(2).join(" ");
    if(!reason) return message.channel.send(new Discord.MessageEmbed()
    .setDescription(`**<a:galaxy_morate:922918261136457789>  Neden \`Mute\` Atıyoruz kanka Etiketten Sonra Sebep Belirtcen!**   🟣`)
    .setFooter(`✶ BOT Developed by Mehmetbey`)
    .setColor('RANDOM')
    .setThumbnail(message.author.avatarURL({ dynamic: true, size: 2048 })))

    let member = await message.guild.getMember(victim.id);
    if(member && member.roles.highest.position >= message.member.roles.highest.position) return message.channel.send(new Discord.MessageEmbed()
    .setDescription(`**<a:galaxy_morate:922918261136457789>  \`Mute\` Atmaya Çalıştığın Kişi Senle Aynı Konumda veya Yüksek İyi Bak!**   ❓`)
    .setFooter(`✶ BOT Developed by Mehmetbey`)
    .setColor('RANDOM')
    .setThumbnail(message.author.avatarURL({ dynamic: true, size: 2048 })))

    if(member && member.manageable) {
        if(!member.roles.cache.has(Settings.Penals.VoiceMute.Role)) member.roles.add(Settings.Penals.VoiceMute.Role).catch();
        if(member.voice.channelID && !member.voice.serverMute) member.voice.setMute(true).catch();
    }

    let document = await PM.addPenal(victim.id, message.author.id, PM.Types.TEMP_VOICE_MUTE, reason, true, Date.now(), time);

    message.channel.send(new Discord.MessageEmbed()
    .setDescription(`${victim} Üyesi ${message.author} Tarafından **| ${reason} |** Sebebiyle Sesli Kanallarda Susturuldu. (**Ceza No:** \`#${document.Id}\`)`)
    .setFooter(`✶ BOT Developed by Mehmetbey`)
    .setColor('RANDOM')
    .setThumbnail(message.author.avatarURL({ dynamic: true, size: 2048 })))
    message.guild.log(message.author, victim, document, Settings.Penals.VoiceMute.Log);
}

module.exports.settings = {
    Commands: ["sesmute"],
    Usage: "sesmute <@user|id> <time> [reason]",
    Description: "Bahsettiğin kişiyi sunucuda sesli bir şekilde geçici olarak susturursun.",
    Category: "Penal",
    Activity: true
}