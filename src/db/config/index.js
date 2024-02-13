const mongoose = require("mongoose");

async function StartDb() {
  try {
    await mongoose.connect("mongodb://127.0.0.1/otpsender");
    console.log("DB connected");
  } catch (error) {
    console.log("Error while connecting DB", error);
  }
}

module.exports = {
  StartDb,
};
