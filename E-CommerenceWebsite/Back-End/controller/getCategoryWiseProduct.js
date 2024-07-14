const productModel = require("../models/productModel");

const getCategoryWiseProduct = async (req, res) => { // Corrected order of req and res
    try {
        const { category } = req.body;
        const products = await productModel.find({ category }); // Added await here
        res.json({
            data: products, // Updated to products
            message: "Product fetched successfully",
            success: true,
            error: false
        });
    } catch (err) { // Corrected the catch block
        res.status(400).json({
            message: err.message || err,
            error: true,
            success: false
        });
    }
};

module.exports = getCategoryWiseProduct;
