const conf = require("../configs/config.json");
const { MessageEmbed } = require("discord.js");
const db = require("quick.db");
const moment = require("moment");
const muteLimit = new Map();
moment.locale("tr");
const ms = require("ms");

module.exports = {
  conf: {
    aliases: ["seskontrol"],
    name: "seskontrol",
    help: "seskontrol [kullanıcı]",
  },


  run: async (client, message, args, embed) => {
    if(![conf.staffs].some(role => message.member.roles.cache.get(role)) && (!message.member.hasPermission(0))) return message.react(conf.carpiID)
  let member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
  if(!member) return message.channel.send(embed.setDescription(`Bir kullanıcı belirtmelisin.`)).then(x => x.delete({ timeout: 5000 }));
  let kanal = member.voice.channel
  if(!kanal) return message.channel.send(embed.setDescription(`Belirttiğin kişi ses kanalında bulunmuyor.`)).then(x => x.delete({ timeout: 5000 }));
  let microphone = member.voice.selfMute ? "Kapalı" : "Açık";
  let headphones = member.voice.selfDeaf ? "Kapalı" : "Açık";
  kanal.createInvite().then(invite =>
  message.channel.send(embed.setDescription(`
 ${member} kişisi \`${kanal.name}\` kanalında 
Mikrafonu : ${microphone} 
Kulaklığı : ${headphones}`)))
    }}