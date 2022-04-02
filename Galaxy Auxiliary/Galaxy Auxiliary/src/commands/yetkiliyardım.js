const moment = require("moment");
require("moment-duration-format");
const conf = require("../configs/config.json");




module.exports = {
  conf: {
    aliases: ["yetkilikomut","yetkiliyardım","yetkiliyardim","yetkilikomutlar"],
    name: "yetkiliyardım",
  },

  run: async (client, message, args, embed, prefix) => {
    
    embed.setThumbnail(message.author.avatarURL({ dynamic: true, size: 2048 }));
    embed.setFooter(`✶ BOT Developed by Mehmet Bey`)
    embed.setColor("RANDOM")
    embed.setDescription(`
    **  <a:galaxytag:919592145067851796> ―  ―  ―  ―  ―  ―  ―  ― Yetkili Komut ―  ―  ―  ―  ―  ―  ―  <a:galaxytag:919592145067851796>  **                               
    <a:galaxy_parlakyldz4:923233503167012905>  g.sesmute **@etiket [Süre] [Sebep] **   *(Ses Mute Atmak İçin)* 
    <a:galaxy_parlakyldz4:923233503167012905>  g.mute **@etiket [Süre] [Sebep]**  *(Chat Mute Atmak İçin)*    
    <a:galaxy_parlakyldz4:923233503167012905>  g.uyarı **@etiket [Sebep]**   *(Uyarı Atmak için)*             
    <a:galaxy_parlakyldz4:923233503167012905>  g.jail **@etiket [Sebep]**   *(Cezalıya Atmak İçin)*           
    <a:galaxy_parlakyldz4:923233503167012905>  g.e **@etiket [İsim] [Yaş] **  *(Erkek Kayıt Etmek İçin)*      
    <a:galaxy_parlakyldz4:923233503167012905>  g.k **@etiket [İsim] [Yaş]**  *(Kız Kayıt Etmek İçin)*
    <a:galaxy_parlakyldz4:923233503167012905> g.e **@etiket [İsim] [Yaş] **  *(Erkek Kayıt Etmek İçin)*
    <a:galaxy_parlakyldz4:923233503167012905> g.k **@etiket [İsim] [Yaş]**  *(Kız Kayıt Etmek İçin)*  
            
    
    
     `)
    message.channel.send(embed);
  }
};
