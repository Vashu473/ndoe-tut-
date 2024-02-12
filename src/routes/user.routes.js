const express = require("express");
const Student = require("../db/schema/Student.schema");
const UserRouter = express.Router();

UserRouter.get("/getAllStudentDetails", async (req, res) => {
  try {
    const studentData = await Student.find();
    return res.json({
      message: "Getting data from  database GET",
      data: studentData,
    });
  } catch (error) {
    console.log("Error getting data from database", error);
  }
});

UserRouter.post("/putDataToStudent", async (req, res) => {
  try {
    const bodyData = req.body;
    const studentData = await Student.create(bodyData);
    return res.json({
      message: "Putting data into  database Post",
      data: studentData,
    });
  } catch (error) {
    console.log("Error Posting data from database", error);
  }
});

UserRouter.put("/", async (req, res) => {
  const bodyData = req.body;
  const updatedData = await Student.updateOne({ _id: bodyData._id }, bodyData);
  return res.json({
    message: "Getting data from  database PUT",
    data: updatedData,
  });
});

UserRouter.patch("/", async (req, res) => {
  const bodyData = req.body;
  const updatedData = await Student.updateOne(
    { _id: bodyData._id },
    { class: bodyData.class }
  );
  return res.json({
    message: "Getting data from  database PATCH",
    data: updatedData,
  });
});

UserRouter.delete("/:id", async (req, res) => {
  const _id = req.params.id;
  const deletedData = await Student.deleteOne({ _id });
  return res.json({
    message: "Getting data from  database DELETE",
    data: deletedData,
  });
});

module.exports = UserRouter;
