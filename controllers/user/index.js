"use strict";

// Packages
const JWT = require("jsonwebtoken");

// Database
const { models } = require("./../../database");

// Utils
const { hash_password, verify_password } = require("../../utils/password");

async function login(req, res) {
  // Params
  const { email, password } = req.body;
  try {
    // Find User
    const user = await models.user.findOne({
      where: {
        email: email,
        isActive: true,
        isDeleted: false,
      },
    });

    // 404
    if (!user) {
      return res.status(404).json({
        status: "notFound",
        message: "User not found!",
      });
    }
    const userJSON = user.toJSON();
    if (!verify_password(password, userJSON.password)) {
      return res.status(400).json({
        status: "badRequest",
        message: "Wrong Password!",
      });
    }

    // Create token
    const token = JWT.sign(
      {
        userId: user.id,
      },
      process.env.JWT_SECRET
    );

    // return new user
    return res.status(200).json({
      status: "success",
      message: "Query successfuly",
      data: {
        access_token: token,
      },
    });
  } catch (err) {
    // Error
    console.log(err);
    return res.status(500).json({
      status: "error at logining",
      message: JSON.stringify(err),
    });
  }
}

async function register(req, res) {
  // Our register logic starts here
  const { name_surname, phone_number, email, password } = req.body;

  try {
    // Get user input
    const oldUser = await models.user.findOne({
      where: {
        email: email,
        isDeleted: false,
      },
    });

    if (oldUser) {
      return res.status(400).send("User Has Already Exist. Please Login");
    }

    // Create user in our database
    const user = await models.user.create({
      name_surname: name_surname,
      phone_number: phone_number,
      email: email.toLowerCase(),
      password: hash_password(password),
    });

    // Create token
    const token = JWT.sign(
      {
        userId: user.id,
      },
      process.env.JWT_SECRET
    );

    // return new user
    return res.status(201).json({
      status: "success",
      message: "Query successfuly",
      data: {
        access_token: token,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: "error at registered",
      message: JSON.stringify(err),
    });
  }
}

async function info(req, res) {
  const { userId } = req;

  try {
    const user = await models.user.findOne({
      where: {
        id: userId,
        isActive: true,
        isDeleted: false,
      }
    });

    if (!user) {
      return res.status(404).json({
        status: "notFound",
        message: "User not found!",
      });
    }

    const userJSON = user.toJSON();
    // return user data
    return res.status(200).json({
      status: "success",
      message: "Query successfuly",
      data: userJSON,
    });

  } catch (err) {
    console.log(err);
    return res.status(500).json({
      status: "error",
      message: JSON.stringify(err),
    });
  }
}

module.exports = { login, register, info };