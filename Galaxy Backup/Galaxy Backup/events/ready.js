module.exports = (client) => {
    client.user.setActivity("Mehmet Bey ❤️ Hasovski ❤️ ✶ GALAXY")
    console.log(`[GALAXY BACKUP] ${client.user.tag} Giriş Yaptı!`);
	if (client.channels.cache.has('878576846508265472')) client.channels.cache.get('878576846508265472').join().catch();
};