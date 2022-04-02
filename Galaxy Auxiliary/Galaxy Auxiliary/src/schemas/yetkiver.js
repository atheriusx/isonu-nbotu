const { Schema, model } = require("mongoose");

const schema = Schema({
  guildID: { type: String, default: "" },
  userID: { type: String, default: "" },
  yetkivr: { type: Number, default: 0 },
});

module.exports = model("yetkiver", schema);