"use strict";

const express = require("express");
const app = express();

require("dotenv").config();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello!");
});


//database
const sequelize = require("./database");

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });


// Routes
const productRouter = require("./routers/product");
const userRouter = require("./routers/user");


app.use("/product", productRouter);
app.use("/user",userRouter)


app.listen(3000, () => {
  console.log(
    process.env.NODE_ENV && process.env.NODE_ENV === "development"
      ? "Started: http://localhost:3000"
      : "Started: https://shark-app-vag45.ondigitalocean.app/"
  );
});
