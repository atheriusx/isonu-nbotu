const { MessageEmbed } = require('discord.js');

exports.run = async(client, message, args) => {
    if (!message.member.hasPermission(268435456)) return;
    let embed = new MessageEmbed().setColor('RANDOM').setAuthor(message.author.username, message.author.avatarURL({ dynamic: true }))

    let pubID = "707568196642799617"

    let pubatılcaklar = message.guild.members.cache.filter(s => s.voice.channel && s.voice.channel.id === message.member.voice.channel.id).filter(x => x.voice.selfDeaf === false)
    let sleep = message.guild.members.cache.filter(s => s.voice.channel && s.voice.channel.id === message.member.voice.channel.id).filter(x => x.voice.selfDeaf === true)

    let kanallar = message.guild.channels.cache.filter(s => s.parentID === pubID)
    let sleepID = "733952579620438058"
    sleep.array().forEach(async(member, index) => {
        setTimeout(() => {
            member.voice.setChannel(sleepID)
        }, index * 2000)
    })
    pubatılcaklar.array().forEach(async(member, index) => {
        setTimeout(() => {
            member.voice.setChannel(kanallar.random())
        }, index * 2000)
    })
    embed.setDescription(`✶ ${sleep.size} **Adet Yetkili Sleep Odasına Taşındı!**
    ✶ ${pubatılcaklar.size} **Adet Yetkili Public Odalara Dağıtıldı!**`)
    message.channel.send(embed)

}
exports.conf = {
    name: "dağıt",
    aliases: ["dağıt"],
    enabled: true,
    guildOnly: true
};

exports.help = { 
    name: 'dağıt', 
    description: '',
    usage: '',
    kategori: 'kullanıcı'
};
