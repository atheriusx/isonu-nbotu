const { Client, Message } = require("discord.js");
const Settings = require("../../Configuration/Settings.json");
const Discord = require("discord.js");
const PenalManager = require("../../Managers/PenalManager");
const Penal = require("../../Models/Database/Penal");

/**
 * @param {Client} client 
 * @param {Message} message 
 * @param {Array<String>} args 
 */
module.exports.execute = async (client, message, args) => {
    if (!message.member.hasPermission("ADMINISTRATOR") && !Settings.Penals.Jail.AuthRoles.some(authRole => message.member.roles.cache.has(authRole))) return message.channel.send(new Discord.MessageEmbed()
    .setDescription(`**<a:galaxy_morate:922918261136457789> Bu Komutu Kullanmak İçin \`Jail\` Yetkin Olması Gerekiyor Canım!**   :x: `)
    .setFooter(`✶ BOT Developed by Mehmetbey`)
    .setColor('RANDOM')
    .setThumbnail(message.author.avatarURL({ dynamic: true, size: 2048 })))

    let victim = message.mentions.users.first() || client.users.cache.get(args[0]) || await client.users.getUser(args[0]);
    if (!victim) return message.channel.send(new Discord.MessageEmbed()
    .setDescription(`**<a:galaxy_morate:922918261136457789>  Kimi \`Hapisten\` Çıkarıyoruz Canım Etiket Atta Tahliye Edelim!**   💙 `)
    .setFooter(`✶ BOT Developed by Mehmetbey`)
    .setColor('RANDOM')
    .setThumbnail(message.author.avatarURL({ dynamic: true, size: 2048 })))

    let penals = await PenalManager.getPenals({ User: victim.id, Activity: true, $or: [{ Type: PenalManager.Types.JAIL }, { Type: PenalManager.Types.TEMP_JAIL }] });
    if (penals.length <= 0) return message.channel.send(new Discord.MessageEmbed()
    .setDescription(`**<a:galaxy_morate:922918261136457789>  Etiketlediğiniz Kişi \`Hapiste\` Değil** 💙 `)
    .setFooter(`✶ BOT Developed by Mehmetbey`)
    .setColor('RANDOM')
    .setThumbnail(message.author.avatarURL({ dynamic: true, size: 2048 })))

    let member = await message.guild.getMember(victim.id);
    if (member && member.roles.highest.position >= message.member.roles.highest.position) return message.channel.send(new Discord.MessageEmbed()
    .setDescription(`**<a:galaxy_morate:922918261136457789>  \`Hapisten\` Tahliye Etmek İstediğin Kişi Senle Aynı Konumda veya Yüksek İyi Bak!**   🟡`)
    .setFooter(`✶ BOT Developed by Mehmetbey`)
    .setColor('RANDOM')
    .setThumbnail(message.author.avatarURL({ dynamic: true, size: 2048 })))

    let cezaNumaraları = penals.map(penal => penal.Id);

    let msg = await message.reply(`${victim} Kişinin Toplam **${penals.length}** Adet Hapis Var. Cezalardan Hangisin Kaldırmak İstiyorsunuz ❓ \`(${cezaNumaraları.map(e => "#" + e).join(", ")})\``);

    let messages = await msg.channel.awaitMessages((m) => m.author.id == message.author.id && cezaNumaraları.some(cevap => m.content.toLowerCase().includes(cevap)), {
        max: 1,
        time: 15000
    });

    if (messages.size <= 0) {
        return message.reply(`${member ? member.displayName : victim.username}(${victim.id}) İçin Başlatmış Olduğun Ceza Kaldırma İşlemi Cevap Vermediğin İçin İptal Ediliyor. ⛔ `);
    }

    let reply = messages.first();
    let penalId = cezaNumaraları.find(e => reply.content.includes(e));
    if (penalId) {
        penalId = Number(penalId);
        await Penal.updateMany({ Id: penalId }, { $set: { Activity: false } }).exec();
        if (member && member.roles.cache.has(Settings.Penals.Jail.Role)) member.setRoles(Settings.Roles.Unregistered);

        message.reply(`${member ? member.displayName : victim.username}(${victim.id}) Kullanıcısının \`#${penalId}\` Numaralı Hapis Cezasını Kaldırdın. ✅`);
    }
    else message.reply(`${member ? member.displayName : victim.username}(${victim.id}) Ceza Kaldırma İşlemi İptal Edildi.`);
};

module.exports.settings = {
    Commands: ["unjail"],
    Usage: "unjail <@user|id>",
    Description: "Etiketlediğin kişinin sunucuda hapis cezası varsa bunu kaldırırsın..",
    Category: "Penal",
    Activity: true
}