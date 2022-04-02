const {Client, Message} = require("discord.js");
const Settings = require("../../Configuration/Settings.json");
const Helper = require("../../Utils/Helper");
const PM = require("../../Managers/PenalManager");
const Penal = require("../../Models/Database/Penal");
const Discord = require("discord.js");
const moment = require("moment");
const jaillimit = new Map();
/**
 * @param {Client} client 
 * @param {Message} message 
 * @param {Array<String>} args 
 */
module.exports.execute = async (client, message, args) => {
	  if (Settings.jaillimit > 0 && jaillimit.has(message.author.id) && jaillimit.get(message.author.id) == Settings.jaillimit) return message.channel.send("1 Günlük Jail Sınırına Ulaştın! MehmetBey ile Veya Sunucu Kurucuları ile İletişime Geç").then(x=>x.delete({timeout:5000}))
    if(!message.member.hasPermission("ADMINISTRATOR") && !Settings.Penals.Jail.AuthRoles.some(authRole => message.member.roles.cache.has(authRole))) return message.channel.send(new Discord.MessageEmbed()
    .setDescription(`**<a:galaxy_morate:922918261136457789>  Bu Komutu Kullanmak İçin \`Jail\` Yetkin Olması Gerekiyor Canım!**   :x: `)
    .setFooter(`✶ BOT Developed by Mehmetbey`)
    .setColor('RANDOM')
    .setThumbnail(message.author.avatarURL({ dynamic: true, size: 2048 })))

    let victim = message.mentions.users.first() || client.users.cache.get(args[0]) || await Helper.GetUser(args[0]);
    if(!victim) return message.channel.send(new Discord.MessageEmbed()
    .setDescription(`**<a:galaxy_morate:922918261136457789>  Kime Kelepçe Takıp \`Hapise\` Atıyoruz Canım Etiket Atta Halledek!**   :x: \n\n<a:galaxy_morate:922918261136457789> **g.jail __@Mehmet Bey DENEME__**  `)
    .setFooter(`✶ BOT Developed by Mehmetbey`)
    .setColor('RANDOM')
    .setThumbnail(message.author.avatarURL({ dynamic: true, size: 2048 })))
    
    let reason = args.splice(1).join(" ");
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

    if(member && member.manageable) PM.setRoles(member, Settings.Penals.Jail.Role);

    let document = await PM.addPenal(victim.id, message.author.id, PM.Types.JAIL, reason);
    

    message.channel.send(new Discord.MessageEmbed()
    .setDescription(`${victim} Üyesi ${message.author} Tarafından **| ${reason} |** Sebebiyle Cezalandırıldı. (**Ceza No:** \`#${document.Id}\`)`)
    .setFooter(`✶ BOT Developed by Mehmetbey`)
    .setColor('RANDOM')
    .setImage("https://media4.giphy.com/media/3ov9k1J6jahVhiev0Q/giphy.gif?cid=ecf05e47tvcnp4ortwipac76cif5hepir01uo9wtfo6wuzc6&rid=giphy.gif&ct=g")
    .setThumbnail(message.author.avatarURL({ dynamic: true, size: 2048 })))
    message.guild.log(message.author, victim, document, Settings.Penals.Jail.Log);
	
	message.guild.log(message.author, victim, document, Settings.Penals.Jail.Log);
    if (Settings.jaillimit > 0) {
      if (!jaillimit.has(message.author.id)) jaillimit.set(message.author.id, 1);
      else jaillimit.set(message.author.id, jaillimit.get(message.author.id) + 1);
      setTimeout(() => {
        if (jaillimit.has(message.author.id)) jaillimit.delete(message.author.id);
      }, 1000 * 60 * 60 * 24 );
    }
  }

module.exports.settings = {
    Commands: ["jail", "cezalandır"],
    Usage: "jail <@user|id> [reason]",
    Description: "Bahsettiğin kişiyi sunucuda kalıcı olarak cezalandırırsın.",
    Category: "Penal",
    Activity: true
}
