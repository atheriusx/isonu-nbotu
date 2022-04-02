const { MessageEmbed } = require("discord.js");
const db = require('quick.db');

exports.run = async (client, message, args) => {
    if (!message.member.roles.cache.has("878576843647762501")) return;
    let embed = new MessageEmbed().setColor('RANDOM').setFooter(`✶ BOT Developed by Mehmet Bey`)
    let victim = message.guild.member(message.mentions.members.first() || message.guild.members.cache.get(args[0]))
    if (!victim.voice.channel) return;
    if (victim.voice.channel.id === message.member.voice.channel.id) return;
    if (!message.member.voice.channel) return;
    victim.voice.setChannel(message.member.voice.channel.id)
    message.channel.send(embed
      .setColor('RANDOM')
      .setFooter(`✶ BOT Developed by Mehmet Bey`)
      .setDescription(`${victim}, Adlı kullanıcı <#${message.member.voice.channel.id}> Adlı kanala çekildi`))
    }
    exports.conf = {
        name: "çek",
        guildOnly: true,
        aliases: [],
        cooldown: 0
    };