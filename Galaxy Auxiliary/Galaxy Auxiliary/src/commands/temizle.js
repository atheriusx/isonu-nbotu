const Discord = require('discord.js');
exports.run = function (client, message, args) {
  if (!message.member.hasPermission(268435456)) return message.reply(":x: Yetersiz İzin Hatası. Bu Komut İçin Mesajları Yönet Yetkim Olması Gerekiyor");
  if (!args[0]) return message.channel.send("Silinecek mesajın miktarını yaz!");

  message.delete()
  message.channel.bulkDelete(args[0]).then(() => {
    message.channel.send(`:white_check_mark: ${args[0]} tane mesaj silindi`)
  })
}

exports.conf = {
    name: "temizle",
    aliases: ["parçala"],
    enabled: true,
    guildOnly: true
};

exports.help = { 
    name: 'temizle', 
    description: 'Boost basanlar isim sag tiksiz degise bilcek.',
    usage: 'isimdeğiştir <isim>',
    kategori: 'kullanıcı'
};