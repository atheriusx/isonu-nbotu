class EventManager {
    static addEvent(fileName) {
        let ref = require(`../Events/${fileName}`);
        global.Client.on(ref.config.Event, ref);
        console.log(`✅ ${fileName} Sistem Yüklendi! [ G A L A X Y ]`);
    }
}

module.exports = EventManager;