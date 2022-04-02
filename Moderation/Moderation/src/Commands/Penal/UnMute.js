const { Client, Message } = require("discord.js");
const Settings = require("../../Configuration/Settings.json");

const PenalManager = require("../../Managers/PenalManager");
const Penal = require("../../Models/Database/Penal");

/**
 * @param {Client} client 
 * @param {Message} message 
 * @param {Array<String>} args 
 */
module.exports.execute = async (client, message, args) => {
    if (!message.member.hasPermission("ADMINISTRATOR") && !Settings.Penals.Mute.AuthRoles.some(authRole => message.member.roles.cache.has(authRole))) return message.reply("Yeterli Yetkin Yok.");

    let victim = message.mentions.users.first() || client.users.cache.get(args[0]) || await client.users.getUser(args[0]);
    if (!victim) return message.reply(`Birisini Etiketlemelisin.`);

    let penals = await PenalManager.getPenals({ User: victim.id, Activity: true, $or: [{ Type: PenalManager.Types.TEMP_MUTE }, { Type: PenalManager.Types.MUTE }] });
    if (penals.length <= 0) return message.reply(`${victim}(${victim.username}) Kişisinin Hiç Susturma Cezası Yok.`);

    let member = await message.guild.getMember(victim.id);
    if (member && member.roles.highest.position >= message.member.roles.highest.position) return message.reply("Senin Rolünden Üstte Ya Da Aynı Roldeki Birisini Susturamazsın.");

    let cezaNumaraları = penals.map(penal => penal.Id);

    let msg = await message.reply(`${victim} Kişisinin toplam **${penals.length}** Adet Sohbet Susturması Var. Cezalardan Hangisin Kaldırmak İstiyorsunuz? \`(${cezaNumaraları.map(e => "#" + e).join(", ")})\``);

    let messages = await msg.channel.awaitMessages((m) => m.author.id == message.author.id && cezaNumaraları.some(cevap => m.content.toLowerCase().includes(cevap)), {
        max: 1,
        time: 15000
    });

    if (messages.size <= 0) {
        return message.reply(`${member ? member.displayName : victim.username}(${victim.id}) İçin Başlatmış Olduğun Ceza Kaldırma İşlemi Cevap Vermediğin İçin İptal Ediliyor.`);
    }

    let reply = messages.first();
    let penalId = cezaNumaraları.find(e => reply.content.includes(e));
    if (penalId) {
        penalId = Number(penalId);
        await Penal.updateMany({ Id: penalId }, { $set: { Activity: false } }).exec();
        if (member && member.roles.cache.has(Settings.Penals.Mute.Role)) member.roles.remove(Settings.Penals.Mute.Role);

        message.reply(`${member ? member.displayName : victim.username}(${victim.id}) Kullanıcısının \`#${penalId}\` Numaralı Susturma Cezasını Kaldırdın. ✅`);
    }
    else message.reply(`${member ? member.displayName : victim.username}(${victim.id}) Sohbet Cezaları Kaldırma İşlemi İptal Edildi.`);
};

module.exports.settings = {
    Commands: ["unmute"],
    Usage: "unmute <@user|id>",
    Description: "Etiketlediğin kişinin aktif olan susturma cezalarından herhangi birini kaldırabilirsin.",
    Category: "Penal",
    Activity: true
}