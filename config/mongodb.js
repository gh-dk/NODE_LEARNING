const mongoose = require("mongoose");
mongoose
  .connect(
    "mongodb+srv://deepakkanojiya:LdYVKZBgPsYrsC63@cluster0.78akxjh.mongodb.net/learn?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then((e) => {
    console.log("connected___mongoDB");
    require("../model/mongodb.model");
  })
  .catch();

module.exports = mongoose;
