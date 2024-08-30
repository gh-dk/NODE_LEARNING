const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    _id: Number,
    name: String,
    password: String,
    email: {
      type: String,
      required: true,
    },
    joiningDate: {
      type: Date,
      required: true,
    },
    dept: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    profilePic: {
      data: Buffer,
      contentType: String,
    },
  },
  {
    timestamps: true,
  }
);
const userModel = mongoose.model("users", userSchema);

module.exports = { userModel };
