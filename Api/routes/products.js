const express = require("express");
const { default: mongoose } = require("mongoose");
const Product = require("../models/product");
const router = express.Router();

router.get("/", (req, res, next) => {
  console.log('req ; ',req);
  Product.find()
  .select("_id name price")
    .exec()
    .then((docs) => {
      res.status(200).json({
        message: "Handling GET requests to /products",
        count: docs.length,
        producs: docs?.map(doc=>{
          return{
           ...doc._doc,
            request:{
              method:'GET',
              url:`http://${req.hostname}:3000/products/${doc._doc._id}` 
            }
          }
        }),
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

router.post("/", (req, res, next) => {
  const { name, price } = req.body;
  const product = new Product({
    _id: new mongoose.Types.ObjectId(),
    name: name,
    price: price,
  });
  product
    .save() // Save() method is provided by mongoose
    .then((result) => {
      console.log(result);
      if (result) res.status(201).json(result);
      else
        res
          .status(404)
          .json({ message: "No Valid data found for Provided ID." });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
  
});

router.get("/:productId", (req, res, next) => {
  console.log(req.params);
  const id = req.params.productId;

  Product.findById(id)
    .exec()
    .then((doc) => {
      console.log(doc);
      if (doc) res.status(200).json(doc);
      else
        res
          .status(404)
          .json({ message: "No Valid data found for Provided ID." });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

router.patch("/:productId", (req, res, next) => {
    const id = req.params.productId;
    const updatedObj = {};
    for (const ops of req.body) {
        updatedObj[ops.propName] = ops.value;
    }
    Product.updateOne({_id:id},{$set:updatedObj}).exec().then(doc=>{
        res.status(200).json({
            message: "Updated the Product",
            doc 
          });
    })
  
});

router.delete("/:productId", (req, res, next) => {
    const id = req.params.productId;
    Product.remove({_id:id}).exec().then(result=>{
        res.status(200).json({
            message: "Deleted the Product",
            result
          });
    }).catch(err=>{
        console.log(err);
        res.status(500).json({ error: err });
    })

});

module.exports = router;
