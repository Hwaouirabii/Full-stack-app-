const express = require("express");
const Product = require("../models/Product");
const router = express.Router();

router.get("/", async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 5;
  const skip = (page - 1) * limit;

  const products = await Product.find().skip(skip).limit(limit);
  const totalProducts = await Product.countDocuments();

  res.json({
    products,
    totalPages: Math.ceil(totalProducts / limit),
    currentPage: page,
  });
});

module.exports = router;
