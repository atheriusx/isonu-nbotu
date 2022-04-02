const {MessageMenuOption , MessageMenu , MessageActionRow} = require("discord-buttons")
module.exports = {
  conf: {
    aliases: ["yapmahasan"],
    name: "yapmahasan",
    help: "yapmahasan",
    owner: true
  },
  
      run: async(client,message,args,embed) => {


        /* Select Menü 2. Rolleri */
        const KutuRol15 = new MessageMenuOption()
        .setLabel('VK')
        .setDescription(`Vampir Köylü Rolü Almak İçin Tıkla`)
        .setEmoji("923233503167012905")
        .setValue('vk');

        const KutuRol16 = new MessageMenuOption()
        .setLabel('DC')
        .setDescription(`Doğruluk Cesaretlik Rolü Almak İçin Tıkla.`)
        .setEmoji("923233503167012905")
        .setValue('dc');

        const KutuRol17 = new MessageMenuOption()
        .setLabel('Gif/Pp')
        .setDescription(`Gif/Pp Rolü Almak İçin Tıkla.`)
        .setEmoji("923233503167012905")
        .setValue('gif');

        const KutuRol18 = new MessageMenuOption()
        .setLabel('Rolsüz')
        .setDescription(`Rollerini Temizlemek İçin Tıkla.`)
        .setEmoji("🗑️")
        .setValue('rolsuzz');

        /* Select Menü 2 Tanım */

        const Menu2 = new MessageMenu()
        .setID("oyun")
        .setPlaceholder(`Oyun Rolleri`)
        .addOption(KutuRol15)
        .addOption(KutuRol16)
        .addOption(KutuRol17)
        .addOption(KutuRol18)

        
        const RoleMenu2 = new MessageActionRow()
        .addComponent(Menu2)

        

        message.channel.send(`  \`\`\`•❯ Aşağıda ki Menüden Oyun Rollerini İştediğiniz Hangisi İse Alabilirsiniz.\`\`\`
        `, {
          components: [
            RoleMenu2],
        });
  }}