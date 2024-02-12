const mongoose = require("mongoose");

// making schema
const TeacherSchema = mongoose.Schema({
  name: String,
  email: String,
  number: Number,
});

// making model instance
const Teacher = await mongoose.model("Teacher", TeacherSchema);

module.exports = Teacher;
