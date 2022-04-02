const { Client, Collection } = require("discord.js");
const client = (global.client = new Client({ fetchAllMembers: true }));
const settings = require("./src/configs/settings.json");
client.commands = new Collection();
client.invites = new Collection();
client.cooldown = new Map();
const Discord = require("discord.js");
const chalk = require("chalk");
const moment = require("moment");
const fs = require("fs");
const http = require("http");
const express = require("express");
const path = require("path");
const request = require("request");
const queue = new Map();
require("./src/handlers/commandHandler");
require("./src/handlers/eventHandler");
require("./src/handlers/mongoHandler");
require("./src/handlers/functionHandler")(client);

client
  .login(settings.token)
  .then(() => console.log("[Mehmet Bey] Bot GALAXY Giriş Yaptı!"))
  .catch(() => console.log("[Mehmet Bey] Bot GALAXY Giriş Yapamadı!"));

  client.on("guildMemberAdd", member => {
    const kanal = "878576845300330530";
    let user = client.users.cache.get(member.id);
    require("moment-duration-format");
    const kurulus = new Date().getTime() - user.createdAt.getTime();
    const exampleEmbed = new Discord.MessageEmbed();
  
    var kontrol;
    if (kurulus < 1296000000)
      kontrol =
        "<a:galaxy_x:922918260574421022> **__Bu Hesap Güvenilir Değil__** <a:galaxy_x:922918260574421022>";
    if (kurulus > 1296000000)
      kontrol =
        " <a:galaxy_tik:923233511400423495> **__Bu Hesap Güvenilir Gözüküyor__** <a:galaxy_tik:923233511400423495>";
    moment.locale("tr");
    let buse = client.channels.cache.get(kanal);
    buse.send(
      "** <a:galaxy_okluparlakyldz:923233509668188191> Hoşgeldin!** " +member.toString()+

        " **Seninle `" +
        member.guild.memberCount +
        "` Kişiyiz.**  \n\n <a:galaxy_okluparlakyldz:923233509668188191> **Müsait olduğunda Teyit Odalarından Birine Geçip Kaydını Yaptırabilirsin.** \n\n <a:galaxy_okluparlakyldz:923233509668188191> <@&878576843563872312> **seninle ilgilenicektir.** \n\n :alarm_clock: Hesabın Oluşturulma Tarihi <a:galaxy_okluparlakyldz:923233509668188191>" +
        moment(member.user.createdAt).format(
          "** __YYYY DD MMMM dddd (hh:mm:ss)__**"
        ) +
        "\n\n" +
        kontrol +
        " \n\n <a:galaxytag:919592145067851796> **Tagımızı alarak ` ✶ ` bize destek olabilirsin.** \n\n",
    );
  });




  client.on('ready', () => {
    client.user.setPresence({ activity: { name: "Mehmet Bey ❤️ Hasovski ❤️ ✶ GALAXY" }, status: "online" });
    if (client.channels.cache.has('878576846508265472')) client.channels.cache.get('878576846508265472').join().catch();
});