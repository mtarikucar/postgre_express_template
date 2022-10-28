
"use strict";

const userRouter = require("express").Router();

// Middlewares
const { authCheck } = require("../middlewares/auth");

// Controllers
const { login, register, info } = require("./../controllers/user");

// Routes
userRouter.post("/login", login);

userRouter.post("/register", register);

userRouter.get("/me", authCheck, info);

module.exports = userRouter;