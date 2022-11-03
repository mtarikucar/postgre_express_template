"use strict";

const express = require("express");
var cors = require('cors')
const app = express();

require("dotenv").config();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const corsOptions ={
  origin:'http://localhost:3000', 
  credentials:true,            //access-control-allow-credentials:true
  optionSuccessStatus:200
}
app.use(cors(corsOptions))

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


app.listen(process.env.PORT, () => {
  console.log(
    process.env.NODE_ENV && process.env.NODE_ENV === "development"
      ? `Started: http://localhost:${process.env.PORT}`
      : "Started: https://nurlightapi.herokuapp.com/"
  );
});
