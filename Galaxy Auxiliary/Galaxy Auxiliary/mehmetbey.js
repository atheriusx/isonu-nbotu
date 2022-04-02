const { Client, Collection } = require("discord.js");
const client = (global.client = new Client());
const settings = require("./src/configs/settings.json");
const db = require('quick.db')
const { MessageEmbed } = require('discord.js');
const Discord = require('discord.js');
const moment = require('moment');
client.commands = new Collection();
client.aliases = new Collection();
client.invites = new Collection();
client.cooldown = new Map();

const emojiler = {
   0: "<a:galaxy_0:922006801694748762>", // Emoji ID 0
   1: "<a:galaxy_1:922006802030288896>", // Emoji ID 1
   2: "<a:galaxy_2:922006802265178185>", // Emoji ID 2
   3: "<a:galaxy_3:922006804261666846>", // Emoji ID 3
   4: "<a:galaxy_4:922006802705555457>", // Emoji ID 4
   5: "<a:galaxy_5:922006803020124220>", // Emoji ID 5
   6: "<a:galaxy_6:922006801623449651>", // Emoji ID 6
   7: "<a:galaxy_7:922006802302914561>", // Emoji ID 7
   8: "<a:galaxy_8:922006802848157716>", // Emoji ID 8
   9: "<a:galaxy_9:922006793360662538>"} // Emoji ID 9
  client.emojili = (string) => {
    let arx = "";
    String(string).split("").forEach(x => {
      arx += "" + emojiler[Number(x)];
    });
    return arx;
  };
    client.sayilariCevir = function(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };



require("./src/handlers/commandHandler");
require("./src/handlers/eventHandler");
require("./src/handlers/functionHandler")(client);
client.on('ready', () => {
            client.user.setPresence({ activity: { name: "Mehmet Bey ❤️ Hasovski ❤️ ✶ GALAXY" }, status: "online" });
            if (client.channels.cache.has('878576846508265472')) client.channels.cache.get('878576846508265472').join().catch();
        });
		
		let reklamlar = ["http://","https://","cdn.discordapp.com","discordapp.com","discord.app", "discord.gg","discordapp","discordgg", ".com", ".net", ".xyz", ".tk", ".pw", ".io", ".gg", "www.", "https", "http", ".gl", ".org", ".com.tr", ".biz", ".party", ".rf.gd", ".az", ".cf"]

client.on('message', async message => {
let kelimeler = message.content.slice(" ").split(/ +/g)
if (reklamlar.some(word => message.content.toLowerCase().includes(word))) {
if (message.member.hasPermission("BAN_MEMBERS")) return;
message.delete()
}
});
client.on("messageUpdate", async (oldMsg, newMsg) => {
let kelimeler = newMsg.content.slice(" ").split(/ +/g)
if (reklamlar.some(word => newMsg.content.toLowerCase().includes(word))) {
if (newMsg.member.hasPermission("BAN_MEMBERS")) return;
newMsg.delete()
}
});


client.on('userUpdate', async (oldUser, newUser) => {
  if(oldUser.username == newUser.username || oldUser.bot || newUser.bot) return;
  let Guild = client.guilds.cache.get("878576844868292612")
  let Nufrain = Guild.members.cache.get(oldUser.id);
  if(["✶"].some(p => Nufrain.user.username.includes(p))){
  Nufrain.roles.add("878576843454812215").catch();
}});

client.on('userUpdate', async (oldUser, newUser) => {
  if(oldUser.username == newUser.username || oldUser.bot || newUser.bot) return;
  let Guild = client.guilds.cache.get("878576844868292612")
  let Nufrain = Guild.members.cache.get(oldUser.id);
  if(!["✶"].some(p => Nufrain.user.username.includes(p))){
  Nufrain.roles.remove("878576843454812215").catch();
}});



		
		
		
		client.on("message", msg => {
  if (msg.content === "!tag") {
    msg.reply(
      `<a:galaxy_okluparlakyldz:923233509668188191> **( ✶ )** **Tagımızı Alarak Galaxy Ailemize Katılabilirsin** <a:galaxy_okluparlakyldz:923233509668188191> `
    );
  }
});




client.on('messageDelete', message => {
  if(!message.partial) {
    const channel = client.channels.cache.get('878576845300330526')
    if(channel) {
 
    const embed = new MessageEmbed()
    .setAuthor("Mesaj Silindi", message.author.avatarURL({dynamic: true}))
    .addField("🔹 **Mesaj Sahibi**",`${message.author.tag}`, true)
    .addField("🔹 **Mesaj Kanalı**",`${message.channel}`, true)
    .addField("🔹 **Mesaj Silinme Tarihi**",`**${moment().format('LLL')}**`, true)
    .setDescription(`🔹 **Silinen mesaj:** \`${message.content.replace("`", "")}\``)
    .setTimestamp()
    .setColor("#00a3aa")
	.setFooter(`✶ BOT Developed by Mehmet Bey`)
    channel.send(embed);
    }
  }
});
  


client.on("guildMemberAdd", async member => {
const tarih = new Date().getTime() - member.user.createdAt.getTime();
    if (tarih < 1000*360*247 ) {
    member.roles.add("878576843563872310")
    member.roles.remove("878576843454812215")
    member.send(new MessageEmbed().setDescription(`Hesabın 7 günden az bi sürede açıldığı için jaile atıldın. Eğer bir yanlışlık olduğunu düşünüyorsan yanda bulunan yetkililere yazabilirsin.`))
}
}); 

client.on("message", msg => {
  if (msg.content === "sa") {
    msg.reply(
      `<a:galaxyRevuu:926913047434493992> Aleyküm selam hoş geldin GALAXY iyi muhabbetler diler <a:altgen:722000369449697331>`
    );
  }
});

client.on('guildMemberAdd', (member) => {
    if (member.user.bot) return;
    db.add(`girişçıkış.${member.id}`, 1);
   	 if(db.get(`girişçıkış.${member.id}`) >= 5){
     member.guild.members.ban(member.id, { reason: `Sunucudan çok fazla çık gir Yaptığın İçin Banlandın!` })
     client.channels.cache.get("878576844868292610").send(`${member} Adlı Kullanıcı Sunucuya Kısa Süre İçinde Defalarca Çık Gir Yaptığı İçin Sunucudan Banlandı!`)
	}
});
setInterval(() => {
db.all().filter(data => data.ID.endsWith("girişçıkış")).forEach(data => {
db.delete(data.ID)
})
}, 60*1000*1)

client.on("message", msg => {
  if (msg.content === "!link") {
    msg.reply(
      `<a:galaxy_okluparlakyldz:923233509668188191> discord.gg/galaxys <a:galaxy_okluparlakyldz:923233509668188191>`
    );
  }
});

client.on("message", msg => {
  if (msg.content === "Sa") {
    msg.reply(
      `<a:galaxy_okluparlakyldz:923233509668188191> Aleyküm selam hoş geldin GALAXY iyi muhabbetler diler <a:galaxy_okluparlakyldz:923233509668188191>`
    );
  }
});

client.on("message", msg => {
    if (msg.content === "SA") {
      msg.reply(
        `<a:galaxy_okluparlakyldz:923233509668188191> Aleyküm selam hoş geldin GALAXY iyi muhabbetler diler <a:galaxy_okluparlakyldz:923233509668188191>`
      );
    }
  });

  client.on("message", msg => {
    if (msg.content === "sA") {
      msg.reply(
        `<a:galaxy_okluparlakyldz:923233509668188191> Aleyküm selam hoş geldin GALAXY iyi muhabbetler diler <a:galaxy_okluparlakyldz:923233509668188191>`
      );
    }
  });
  
  const mehmetbey = [
'*Boğulduğum en derin su senin gözlerin*. 💙',
'*Kahveyi sevmem ama kahverengi gözlerin başka*. 💙',
'*Nereye gidersen git kokundan bulurum seni*. 💙',
'*Ömrümü adadığım en değerli varlıksın*. 💙',
'*Yüzünü dönme bana ne olur dünyam cehennem olur, yüzüme gül ne olur sensiz hayat bana haram olur gül yüzlüm*. 💙',
'*Sonu mutlu biten masallar gibisin sen*. 💙',
'*Gözlerindeki saklı cenneti benden başkası fark etsin istemiyorum*. 💙',
'*Sabah uykusu kadar güzelsin*. 💙',
'*Ben çoktan şairdim ama senin gibi şiiri ilk defa dinliyorum*. 💙',
'*Sen gülümseyince bulutlar dağılıyor göz bebeğim*. 💙',
'*Birilerinin benim için ettiğinin en büyük kanıtı seninle karşılaşmam*. 💙',
'*Adın geçince sol yanımda bir şeyler kıpırdıyor*. 💙',
'*Şimdi sen bilmezsin, benim sana dokunmadan sarılmışlığım var*. 💙',
'*Ben kalbimin senden önce bu kadar çarpabildiğini bilmiyordum*. 💙',
'*Kaybetmekten korktuğum tek varlığımsın*. 💙',
'*Fazlası zarar olmayan iki şey; biri sen biri kokun*. 💙',
'*O kadar güzel gülüyorsun ki bütün acılarım diniyor*. 💙',
'*Sen benim aldığım en doğru kararsın*.',
'*Ben seni sevmek için değil, sevmek nasıl olurmuş gör diye sevdim*. 💙',
'*Kokunu içime çektiğimde nefes aldığımı anlıyorum*. 💙',
'*Sen acılarımın arasında yeşeren en güzel şifasın benim için*. 💙',
'*Gülüşün öyle güzel ki sarhoş ediyor beni*. 💙',
'*Sen benim hayallerimin vücut bulmuş halisin* 💙',
'*Yokluğuna tahammül edemediğim diğer parçamsın*. 💙',
'*Lütfen üzerine alın! Kimseyi görmedim ben, senden daha güzel gülen*. 💙',
'*Yüreğim yüreğine rastladığında başladı bizim hikayemiz, gözlerinde hapsoldum, gülüşün ile hayat buldum güzel sevgilim*.. 💙',
'*Seni kokladığımda, nefes aldığımı hatırlıyorum*. 💙 ',
'*Seni sevmek sevap ise her gün sevmeye razıyım*. 💙 ',
'*Hangi mısraya sığar sana olan sevdam* 💙',
'*Sen benim arayıp da bulduğum değil, hiç aklımda yokken aşık olduğumsun*. 💙',
'*Şimdi sen de bilmezsin sana dokunmadan saatlerce sarıldığımı*. 💙',
'*Öyle bir sarılırsın ki bana aramızdan rüzgâr geçmez*. 💙',
'*Soluğum kadar yakınsın bana ey yar*! 💙',
'*Derdim de devam da sen oldun haberin yok*. 💙',
'*Deniz seni görse kurur gider güzelliğin karşısında*. 💙',
'*Sen varsan yeter ömrüme. Gerisi hikâye*. 💙',
'*Ne pilsen ne efes kalbim senle prenses*. 💙',
'*Suyun molekülü h2O ysa kalbimin molekülüde sensin* 💙',
'*Kelimelerin güzellik karşısında anlamsız kaldığını sende gördüm*. 💙',
'*Ben seni yazıyorum onlar şiir zannediyor*. 💙',
'*Bu kadar güzel bakma ne olur, aşık olurum. Sonra yakarsın içimi için için *. 💙',
'*İçim o kadar senle doldu ki, insanlar seni gözbebeklerimde görürler diye bakmaya korkar oldum*. 💙',
'*Seni gördükten sonra en büyük mevzu kalbimde başladı*. 💙',
'*Gözlerin gönlüme en yakın liman bense o limandaki tek adam*. 💙',
'*Seninle yuva kurmak tek hayalim, ellerini tutarak ömrümü bitirmek tek isteğim*. 💙',
'*Sıradan bir ismi nasıl da güzelleştiriyorsun sen*. 💙',
'*İnsan seni sevince iş güç sahibi oluyor. Şair oluyor mesela*. 💙',
'*Öyle güzel bakıyorsun ki gözlerime! Yanıyorum adeta için için*. 💙',
'*Yaşanılacak en güzel mevsim sensin*. 💙',
'*Gözlerine bakınca seviyorum sıcacık gülümsemeni*. 💙',
'*Küçücük kalbimde kocaman bir yere sahipsin Sen*. 💙',
'*Gamzen varsa, aksesuarların en güzeli sende demektir*. 💙',
'*Birileri benim için bir dua etmiş olmalı ki; seni bulmuşum*. 💙',
'*Doktora gittim geçende, kalbimde sen varmışsın. Ve bu arada röntgende çok tatlı çıkmışsın sevdiğim*. 💙',
'*Şekere zam gelmiş, ne fark eder ki; sensiz hayatın zaten tadı yok*. 💙',
'*Gülüşünde bir şey var hep içime dokunur*. 💙',
'*Başıma gelen güzel şeylerin nedeni hep sensin*. 💙',
'*Güzelliğini yazabilecek tek bir şair yok. Hepsi lal olur kalır karşında*. 💙',
'*Seni her yerde görebileceğim arzusu, belki de bu hayattaki tek yaşama sebebim*. 💙',
'*Gülüşün güzelliğine anlam katıyor. Gamzelerin ise bambaşka diyarların kapılarını açıyor*. 💙',
'*Kimse konuşmasın yalnız sen konuş bana. Yalnız sen bak gözlerimin içine. Kimse olmasın yalnızca sen ol benim hayatımda*. 💙',
'*Mucizelerden bahsediyordum. Tam o sırda gözlerin geldi aklıma*. 💙',
'*Seni sevince insan iş güç sahibi oluyor*. 💙 ',
'*Dünyayı hiç kimsenin göremediği şekilde görmeme sebep olacak kadar güzelsin*. 💙',
];

client.on("message", async message => {
  if(message.channel.id !== "878576846508265475") return;
  let mehmetbeymesajsay = db.get('mehmetbeyiltifat');
  await db.add("mehmetbeyiltifat", 1);
  if(mehmetbeymesajsay >= 150) {  
    db.delete("mehmetbeyiltifat");
    const random = Math.floor(Math.random() * ((mehmetbey ).length - 1) + 1);
    message.reply(`${(mehmetbey )[random]}`);
  };
});
  

client.on("message", msg => {
  if (msg.content === "selam") {
    msg.reply(
      `<a:galaxy_okluparlakyldz:923233509668188191>Aleyküm selam hoş geldin GALAXY iyi muhabbetler diler <a:galaxy_okluparlakyldz:923233509668188191>`
    );
  }
});

client.on("guildMemberAdd", member => {
  let tag = "✶"
  //mehmetbey
  member.setNickname(`${tag} İsim | Yaş`);
});
		
client
  .login(settings.token)
  .then(() => console.log(`[GALAXY BOT] - |${client.user.tag}| |discord.gg/galaxys| Sunucusuna Bağlandı!`))
  .catch(() => console.log("[GALAXY BOT] Bot Baglanmadi!"));