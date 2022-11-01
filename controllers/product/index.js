"use strict";


const { models } = require("../../database");

async function create_product(req, res) {
  const { name, imgpath, description, price, quantity } = req.body;

  try {
    if (!name & !price & !quantity)
      return res.status(400).json({
        status: "badRequest",
        message: "Missing parameters",
      });

    const product = await models.product.create({
      name: name,
      description: description,
      imgpath: imgpath ? imgpath : null,
      quantity: quantity,
      price: price,
    });

    const productJSON = product.toJSON();
    // return new product
    return res.status(201).json({
      status: "success",
      message: "Query successfuly",
      data: productJSON,
    });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({
      status: "error in product controller",
      message: err.message,
    });
  }
}

//! bu metotda json formatı bakımından bir eksik var üzerine geliştirme yapma test sırasında düzeltirsin
async function get_allProduct(req, res) {
  try {
    return await models.product.findAll().then((products) => {
      if (!products) {
        res.status(404).json({
          status: "404",
          message: "product not found!",
        });
      }

      res.status(200).json({
        status: "success",
        message: "Query successfuly",
        data: products
      });
    });
  } catch (err) {
    return res.status(500).json({
      status: "error in product controller",
      message: err.message,
    });
  }
}

async function get_product(req, res) {
  try {
    return await models.product
      .findOne({
        where: {
          id: req.params.id,
        },
      })
      .then((product) => {
        if (!product) {
          res.status(404).json({
            status: "404",
            message: "product not found!",
          });
        }

        res.status(200).json({
          status: "success",
          message: "Query successfuly",
          data: product,
        });
      });
  } catch (err) {
    return res.status(500).json({
      status: "error in product controller",
      message: err.message,
    });
  }
}

async function update_product(req, res) {
  try {
    const { name, imgpath, description, price, quantity } = req.body;

    const product = await models.product.create({
      name: name,
      description: description,
      imgpath: imgpath ? imgpath : null,
      quantity: quantity,
      price: price,
    });

    const productJSON = product.toJSON();

    return await models.product
      .findOne({
        where: {
          id: req.params.id,
        },
      })
      .then((product) => {
        if (!product) {
          res.status(404).json({
            status: "404",
            message: "product not found!",
          });
        } else {
          product.update(productJSON)
          res.status(201).json({
            status: "success",
            message: "Query successfuly mi",
          });
        }
      });
  } catch (err) {
    return res.status(500).json({
      status: "error in product controller",
      message: err.message,
    });
  }
}

async function delete_product(req, res) {
  try {
    return await models.product
      .findOne({
        where: {
          id: req.params.id,
        },
      })
      .then((product) => {
        if (!product) {
          res.status(404).json({
            status: "404",
            message: "product not found!",
          });
        } else {
          product.destroy();
          res.status(201).json({
            status: "success",
            message: "Query successfuly",
          });
        }
      });
  } catch (err) {
    return res.status(500).json({
      status: "error in product controller",
      message: err.message,
    });
  }
}

module.exports = {
  create_product,
  get_allProduct,
  get_product,
  update_product,
  delete_product
};
