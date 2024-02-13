const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  email: String,
  password: String,
  number: Number,
  otp: {
    type: Number,
    default: 0,
  },
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
