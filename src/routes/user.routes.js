const express = require("express");
const User = require("../db/schema");
const UserRouter = express.Router();
const fast2sms = require("fast-two-sms");

function generateOtp() {
  return Math.ceil(Math.random() * 999999);
}

UserRouter.post("/validateOtp", async (req, res) => {
  try {
    //  validate email and otp
    const user = await User.findOne({ email: req.body.email });
    if (user?.email) {
      if (user.otp == req.body.otp) {
        return res.json({
          message: "Login success",
          error: null,
          data: user,
        });
      } else {
        return res.json({
          message: "Invalid OTP",
          error: null,
          data: null,
        });
      }
    } else {
      return res.json({
        message: "User not found",
        error: null,
        data: null,
      });
    }
  } catch (error) {
    console.log("Getting error while validating OTP", error);
    return res.json({
      message: "Internal server problem",
      error: null,
      data: null,
    });
  }
});

UserRouter.post("/login", async (req, res) => {
  try {
    const data = req.body;
    // email, password are required fields for login
    const user = await User.findOne({ email: data.email });
    if (user?.email) {
      if (user?.password == data.password) {
        let otp = generateOtp();
        await User.findOneAndUpdate({ email: data.email }, { otp });

        var options = {
          authorization:
            "vgEAqyIx3NbGt6lpzf7uVO0rYLdU5PQj1SZTocX8wsMm4kHiRCrUIYij52dm0QNJbyXgGqvf7xuhT8oL",
          message: `OTP is ${otp}`,
          numbers: [String(data.number)],
        };

        fast2sms.sendMessage(options);

        return res.json({
          message: "Otp sent successfully to your registered number",
          error: null,
          data: user,
        });
      } else {
        return res.json({
          message: "Invalid credentials",
          error: null,
          data: null,
        });
      }
    } else {
      return res.json({
        message: "User not found",
        error: null,
        data: null,
      });
    }
  } catch (error) {
    console.log("Error while validating user", error);
    return res.json({
      message: "Getting error from Login",
      error,
      data: null,
    });
  }
});

UserRouter.post("/signup", async (req, res) => {
  try {
    const data = req.body;
    // email, password, number are required fields for sign up
    const user = await User.create(data);
    return res.json({
      message: "User created successfully",
      error: null,
      data: user,
    });
  } catch (error) {
    console.log("Error while adding user", error);
    return res.json({
      message: "Getting error from Signup",
      error,
      data: null,
    });
  }
});

module.exports = UserRouter;
