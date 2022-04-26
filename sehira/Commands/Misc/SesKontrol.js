const { Client, Message, MessageEmbed, Guild } = require("discord.js");

module.exports = {
    Isim: "seskontrol",
    Komut: ["sesk"],
    Kullanim: "seskontrol @sehira/ID",
    Aciklama: "Belirlenen üyenin seste aktif veya haporleri ve kulaklığının açık veya kapalı olduğunu gösterir.",
    Kategori: "Yönetim",
    Extend: true,
  /**
   * @param {Client} client 
   */
  onLoad: function (client) {

  },
  /**
   * @param {Client} client 
   * @param {Message} message 
   * @param {Array<String>} args 
   * @param {Guild} guild
   */
  onRequest: async (client, message, args) => {
    if(roller.üstYönetimRolleri.some(oku => message.member.roles.cache.has(oku)) && roller.altYönetimRolleri.some(oku => message.member.roles.cache.has(oku)) && roller.yönetimRolleri.some(oku => message.member.roles.cache.has(oku)) && !roller.kurucuRolleri.some(oku => message.member.roles.cache.has(oku)) && !message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(cevaplar.noyt); 
    let uye = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if(!uye) return message.channel.send(`${cevaplar.prefix} Lütfen bir üye etiketleyin veya Id giriniz!  __Örn:__  \`${sistem.prefix}seskontrol @sehira/ID\``).then(x => x.delete({timeout: 5000}));
    if(!uye.voice.channel) return message.channel.send(`Bilgi: ${uye}, (\`${uye.id}\`) bir ses kanalında aktif değil.`).then(x => x.delete({timeout: 5000}));
    let selfM = uye.voice.selfMute ? "kapalı" : "açık";
    let selfD = uye.voice.selfDeaf ? "kapalı" : "açık";
    message.channel.send(`${message.guild.emojiGöster(emojiler.Tag)} ${uye}, (\`${uye.id}\`) adlı kullanıcı şu anda \`${message.guild.channels.cache.get(uye.voice.channelID).name}\` adlı ses kanalında ayrıca mikrofonu **${selfM}**, kulaklığı **${selfD}**.`).then(x => x.delete({timeout: 15000}));;
    
  }
};