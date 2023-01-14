const express = require("express");

const router = express.Router();

router.get("/", (req, res, next) => {
  res.status(200).json({
    message: "Orders Fetched",
  });
});

router.post("/", (req, res, next) => {
  const { productId, quantity } = req.body;
  const order = {
    productId: productId,
    quantity: quantity,
  };
  res.status(201).json({
    message: "order was created",
    order,
  });
});

router.get("/:orderId", (req, res, next) => {
  res.status(200).json({
    message: "Order details",
    orferId: req.params.orderId,
  });
});
router.delete("/:orderId", (req, res, next) => {
  res.status(200).json({
    message: "Order deleted",
    orderId: req.params.orderId,
  });
});

module.exports = router;
