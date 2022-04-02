const client = global.Client;
const { Client } = require("discord.js");
const Config = require("./Configuration/Config.json");
const db = require('quick.db')
const EM = require("./Managers/EventManager");


EM.addEvent("CommandHandler");
EM.addEvent("Timer.js");
EM.addEvent("Penal/OnMemberUpdate");
EM.addEvent("Penal/OnReady");




client.on("ready", () => console.log("✅ [ MehmetBey ] Bot Galaxy Sunucumuza Giriş Yaptı! [ ✶ G A L A X Y ] ")) 
client.on('ready', () => {
    client.user.setPresence({ activity: { name: "Mehmet Bey ❤️ Hasovski ❤️✶ GALAXY" }, status: "online" });
    if (client.channels.cache.has('878576846508265472')) client.channels.cache.get('878576846508265472').join().catch();
});
  

require("./Utils/Helper");
require("./Utils/Patch");

client.login(Config.Token).catch(console.error);