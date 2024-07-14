// Backend code in searchProduct.js

const productModel = require("../models/productModel");

const searchProduct = async (req, res) => {
  try {
    const query = req.query.q;
    const regex = new RegExp(query, 'i'); // Construct regex for case-insensitive search
    const products = await productModel.find({
      "$or": [
        { productName: regex },
        { category: regex }
      ]
    });
    res.json({
      data: products,
      message: "Search Product List",
      success: true,
      error: false
    });
  } catch (e) {
    res.status(400).json({
      message: e.message || "Error fetching product list",
      error: true,
      success: false
    });
  }
};

module.exports = searchProduct;
