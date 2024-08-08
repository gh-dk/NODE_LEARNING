const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: String,
    password: String,
  },
  {
    timeStamp: true,
  }
);
const userModel = mongoose.model("users", userSchema);

module.exports = { userModel };
