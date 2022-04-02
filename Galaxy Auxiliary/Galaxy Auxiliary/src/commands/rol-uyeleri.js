const Discord = require('discord.js');

exports.run = async (client, message, args) => {
  if (!message.member.hasPermission(268435456)) return;
  let rol = message.mentions.roles.first() || message.guild.roles.find(rol => rol.name === args.join(' ')) || message.guild.roles.get(args[0]);
  if (!rol) return message.reply('Böyle bir rol bulunamadı!');
  message.channel.send(`${rol.members.map(uye => uye.id + " | " + uye.displayName).join('\n')}`, { split: true, code: "xl" });
}

exports.conf = {
    name: "rol-üyeleri",
    aliases: ["kontrol"],
    enabled: true,
    guildOnly: true
};

exports.help = { 
    name: 'rol-üyeleri', 
    description: '',
    usage: '',
    kategori: 'kullanıcı'
};