const mongoose = require("mongoose");

async function StartDb(params) {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/vashu");
    console.log("database started");
  } catch (error) {
    console.log("Error in starting DB", error);
  }
}

async function StopDb(params) {
  try {
    await mongoose.disconnect();
    console.log("database stopped");
  } catch (error) {
    console.log("Error in stoping DB", error);
  }
}

module.exports = {
  StartDb,
  StopDb,
};
