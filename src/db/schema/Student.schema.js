const mongoose = require("mongoose");

// making schema
const StudentSchema = mongoose.Schema({
  name: String,
  email: String,
  number: Number,
  age: Number,
  class: Number,
});

// making model instance
const Student = new mongoose.model("Student", StudentSchema);

module.exports = Student;
