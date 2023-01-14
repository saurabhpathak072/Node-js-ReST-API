const express = require("express");

const router = express.Router();

router
  .get("/", (req, res, next) => {
    res.status(200).json({
      message: "Orders Fetched",
    });
  })
  .post((req, res, next) => {
    res.status(201).json({
      message: "order was created",
    });
  });

router
  .get("/:orderId", (req, res, next) => {
    res.status(200).json({
      message: "Order details",
      orferId: req.params.orderId,
    });
  })
  .delete((req, res, next) => {
    res.status(200).json({
      message: "Order delet",
      orderId: req.params.orderId,
    });
  });

module.exports = router;
