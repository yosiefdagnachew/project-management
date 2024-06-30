const userModel = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const asyncHandler = require("express-async-handler");
const { response } = require("express");
const User = require("../models/User");

// Load the sample employee data from JSON file
const sampleEmployees = JSON.parse(fs.readFileSync("./employee.json"));

module.exports.registerUser = asyncHandler(async (req, res) => {
  const { email, password, profile, code } = req.body;

  // Check if the email already exists
  const verifyEmail = await userModel.findOne({
    email: email,
  });
  const emp = sampleEmployees.find(
    (employee) => employee.email === email && employee.employeeCode === code
  );
  if (!emp) {
    return res.status(201).json({
      message:
        "Unable to find you in our employee database. Please contact our center in person for further discussion.",
    });
  }
  // Verify if the user is an employee
  const {
    role,
    fullName,
    phoneNumber,
    sex,
    employmentDate,
    salary,
    employeeCode,
  } = emp;



  try {
    if (verifyEmail) {
      return res.status(403).json({
        message: "Email already used",
      });
    } else {
      bcrypt.hash(password, 10).then((hash) => {
        //Registering the user
        const user = new userModel({
          name: fullName,
          email,
          password: hash,
          profile,
          phoneNumber,
          position: role,
          salary,
          sex,
          employmentDate,
          code: employeeCode,
        });

        //saving the data to the mongodb user collection
        user
          .save()
          .then((response) => {
            return res.status(201).json({
              message: "user successfully created!",
              result: response,
              success: true,
            });
          })
          .catch((error) => {
            res.status(500).json({
              error: error,
            });
          });
      });
    }
  } catch (error) {
    // Send an error response
    return res.status(412).send({
      success: false,
      message: error.message,
    });
  }
});

// login controller
module.exports.userLoginController = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await userModel.findOne({
      email,
    });

    if (!user) {
      // If user does not exist, respond with Authentication Failed
      return res.status(401).json({
        message: "Authentication Failed",
      });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      // If passwords do not match, respond with Authentication Failed
      return res.status(401).json({
        message: "Authentication Failed",
      });
    }

    const jwtToken = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_SECRET
    );

    return res.status(200).json({
      token: jwtToken,
      message: "Logged in successfully",
      id: user._id,
      user,
    });
  } catch (error) {
    return res.status(401).json({
      message: error.message,
      success: false,
    });
  }
});

module.exports.getUserInfo = async (req, res) => {
  const { email, code } = req.body;

  try {
    const user = await userModel.findOne({
      email,
    });

    if (user.code === code) {
      return res.status(200).json({
        message: "",
        user,
      });
    } else {
      return res.status(200).json({
        message: "User not found",
      });
    }
  } catch (error) {
    return res.status(401).json({
      message: "Something went wrong",
    });
  }
};


module.exports.resetPassword = async (req, res) => {
  try {

    const { userId, password } = req.body;
    const user = await userModel.findById(userId);
    bcrypt
      .hash(password, 10)
      .then((hash) => {
        user.password = hash;
        user.save();
      });

    return res.status(200).json({
      message: "password reseted successfully!",
    });

  } catch (error) {
    return res.status(200).json({
      message: "Something went wrong!",
    });
  }
};


module.exports.userLogoutController = (req, res) => {
  // Clear the authentication token
  // ...

  // Set Cache-Control header to prevent caching
  res.set("Cache-Control", "no-store");

  // Redirect the user to the login page or a public landing page
  res.redirect("/login");
};