const Discord = require("discord.js"),
client = new Discord.Client();
 

module.exports.run = async (client, message, args) => {
    let mehmetbeyembed = new Discord.MessageEmbed().setColor(0x7997ff).setFooter(`✶ BOT Developed by Mehmet Bey`).setAuthor(message.author.username, message.author.avatarURL({dynamic: true}))

if (!message.member.hasPermission(67108864)) return message.channel.send(mehmetbeyembed.setDescription(`Bu komutu kullanmak için yeterli yetkin yok`)).then(m => m.delete({timeout: 10000}));
let channel = message.guild.channels.cache.get(args[0]) || message.member.voice.channel;
if (!channel) message.channel.send(mehmetbeyembed.setDescription(`Bir Kanal ID'si Belirtin yada Bir Kanala Katılın`)).then(m => m.delete({timeout: 10000}));
channel.members.filter((s) => !s.hasPermission(67108864))
.forEach((s, index) => {
  s.voice.setMute(true);
});
message.channel.send(mehmetbeyembed
.setFooter(`✶ BOT Developed by Mehmet Bey`)
.setDescription(`\`${channel.name}\` Kanalındaki Herkes Başarılı Bir Şekilde Susturuldu`))
};

exports.conf = {
  name: "herkesi-sustur",
  guildOnly: true,
  aliases: ["herkesi-sustur"],
};