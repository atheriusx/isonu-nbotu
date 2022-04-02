const mongoose = require("mongoose");
const settings = require("../configs/settings.json");

mongoose.connect(settings.mongoUrl, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useFindAndModify: false,
});

mongoose.connection.on("connected", () => {
  console.log("[GALAXY DATA] MongoDB Veri Tabanına Baglandim! ");
});
mongoose.connection.on("error", () => {
  console.error("[GALAXY DATA] - MongoDB Baglanamadim!");
});
