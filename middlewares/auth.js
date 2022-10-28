"use strict";

// Packages
const JWT = require("jsonwebtoken");

const authCheck = async function (req, res, next) {
  // Params & Token
  const authHeader = req.headers.authorization;
  try {
    // 401
    if (!authHeader) {
      return res.status(401).json({
        status: "unauthorized",
        message: "Unauthorized user!",
      });
    }
    // Check JWT
    const token = authHeader.split(" ")[1];
    const user = JWT.verify(token, process.env.JWT_SECRET);
    // 401
    if (!user) {
      return res.status(401).json({
        status: "unauthorized",
        message: "Unauthorized user!",
      });
    }
    // Success && Set User data
    req.userId = user.userId;
    next();
  } catch (err) {
    // Error
    console.log(err);
    return res.status(500).json({
      status: "error",
      message: "Server error!",
    });
  }
};

module.exports = { authCheck };