const conf = require("../configs/sunucuayar.json")
module.exports = async (menu) => {

    await menu.clicker.fetch();
    menu.reply.think(true)

    if (menu.values[0] === "invite") {
     setTimeout(() => {
        menu.reply.edit(`
\`\`\`
- .invite (stat [user])
- .topdavet (topdavet)
\`\`\`
`)
     },750) 
    }

    if (menu.values[0] === "genel") {
     setTimeout(() => {
        menu.reply.edit(`
\`\`\`
- .afk (afk [sebep])
- .avatar (avatar [@algos/ID])
- .banner (banner [@algos/ID])
- .booster (boost [nick])
- .profil (profil / [@algos/ID])
- .tag (tag)
- .yardım (yardım)
- .çek (çek [@algos/ID])
- .git (git [@algos/ID])
- .market (coinmarket) 
- .satınal (satınal) 
- .görev (görev [user])
- .coin [ekle/sil/gönder] [kullanıcı] [sayı]
\`\`\`
`)
     },750) 
    }

    if (menu.values[0] === "kayıt") {
     setTimeout(() => {
        menu.reply.edit(`
\`\`\`
- .taglı-alım [aç/kapat]
- .kayıt (kayıt [user] İsim Yaş)
- .bağlantı-kes ([user])
- .isim (isim [user] [name | age])
- .isimler (isimler [user])
- .top-teyit (top-teyit)
- .unregister (unregister [user])
\`\`\`
`)
     },750) 
    }

    if (menu.values[0] === "kurucu") {
     setTimeout(() => {
        menu.reply.edit(`
\`\`\`
- .kilit ([aç/kapat])
- .tagsay (tagsay)
- .banliste (banlist)
- .rolbilgi (@algosrol/ID)
- .cezapuansil ([user])
- .isimsil ([user])
- .sicilsil ([user])
- .yasaklı-tag (ekle/sil/liste [yasaklıtag])
- .ekip ([ekle-sil-liste-kontrol-bilgi])
- .ekip-ses ([@ekiprol])
- .yetkilises (yetkilises)
- .yoklama (toplantı)
- .allmute (allmute [kanal])
- .allunmute (allunmute [kanal])
- .toplutaşı (toplutaşı [kanal])
\`\`\`
`)
     },750) 
    }
    if (menu.values[0] === "moderasyon") {
     setTimeout(() => {
        menu.reply.edit(`
\`\`\`
- .yargı (yargı [@algos/ID] [reason])
- .jail (jail [@algos/ID] [reason])
- .vmute (vmute [@algos/ID] [time] [reason])
- .mute (mute [@algos/ID] [time] [reason])
- .jail (jail [@algos/ID] [reason])
- .unban (unban [@algos/ID])
- .unmute (unmute [@algos/ID] )
- .unvmute (unvmute [@algos/ID] )
- .unjail (unjail [@algos/ID] )
- .sicil (sicil [@algos/ID])
- .topceza (topceza)
- .cezapuan (cezapuan [@algos/ID])
- .cezasorgu (cezasorgu [Ceza ID])
- .yargılist (yargıliste)
- .allmute (allmute [kanal])
- .allunmute (allunmute [kanal])
- .toplutaşı (toplutaşı [kanal])
\`\`\`
`)
     },750) 
    }

    if (menu.values[0] === "stat") {
     setTimeout(() => {
        menu.reply.edit(`
\`\`\`
- .stat (stat [@algos/ID])
- .top (top)
- .nerede (sesbilgi)
- .topcoin (topcoin)
\`\`\`
`)
     },750) 
    }

    if (menu.values[0] === "yetkili") {
     setTimeout(() => {
        menu.reply.edit(`
\`\`\`
- .ystat (yetkim [@algos/ID])
- .cezapuan (cezapuan [@algos/ID])
- .kes (kes [@algos/ID])
- .rolsüz (rolsüz)
- .say (say)
- .snipe (snipe)
- .sesli (sesli)
- .sicil (sicil [@algos/ID])
- .yetkili (yetkili [@algos/ID])
- .taglı (taglı [@algos/ID])
- .rol (r [al/ver] [@algos/ID] [@algosrol/ID])
- .rollog (rollog [@algos/ID])
- .seslisay (sesli)
- .sil (sil [miktar])
\`\`\`
`)
     },750) 
    }
}
module.exports.conf = {
    name: "clickMenu",
  };

