"use strict";

const productRouter = require("express").Router();

// Controllers
const {  get_allProduct, create_product, get_product, update_product, delete_product } = require("./../controllers/product");

// Routes
productRouter.get("/",get_allProduct);
productRouter.get("/:id",get_product);

productRouter.post("/",create_product);

productRouter.put("/:id",update_product)

productRouter.delete("/:id",delete_product)

module.exports = productRouter;