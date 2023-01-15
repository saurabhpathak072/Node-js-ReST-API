const express = require("express");
const { default: mongoose } = require("mongoose");
const Order = require("../models/order");
const Product = require("../models/product");

const router = express.Router();

router.get("/", (req, res, next) => {
  Order.find()
    .select("_id product quantity")
    .exec()
    .then((docs) => {
      res.status(200).json({
        message: "Orders Fetched",
        count: docs.length,
        products: docs?.map((doc) => {
          return {
            ...doc._doc,

            request: {
              method: "GET",
              url: `http://${req.hostname}:3000/orders/${doc._doc._id}`,
            },
          };
        }),
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

router.post("/", (req, res, next) => {
  const { productId, quantity } = req.body;

  Product.findById(productId)
    .exec()
    .then((produt) => {
      if (!produt) {
        res.status(404);
        throw new Error("Product not Found");
        // return res.status(404).json({message:"Product not Found"});
      }
      const order = new Order({
        _id: mongoose.Types.ObjectId(),
        product: productId,
        quantity: quantity,
      });
      return order.save();
    })
    .then((result) => {
      console.log("result", result);
      res.status(201).json({
        message: "order was created",
        products: {
          ...result._doc,
          required: {
            method: "GET",
            url: `http://${req.hostname}:3000/orders/${result._doc._id}`,
          },
        },
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });

  // order
  //   .save()
  //   .then((result) => {
  //     res.status(201).json({
  //       message: "order was created",
  //       result,
  //     });
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //     res.status(500).json({ error: err });
  //   });
});

router.get("/:orderId", (req, res, next) => {
  Order.findById(req.params.orderId)
    .select("_id product quantity")
    .exec()
    .then((docs) => {
      res.status(200).json({
        message: "Order details",
        orders: docs,
      });
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
});

router.delete("/:orderId", (req, res, next) => {
  const { orderId } = req.params;
  Order.remove({ _id: orderId })
    .exec()
    .then(result=>{
      res.status(200).json({
        message: "Order deleted",
        result
      })
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
  
});

module.exports = router;
