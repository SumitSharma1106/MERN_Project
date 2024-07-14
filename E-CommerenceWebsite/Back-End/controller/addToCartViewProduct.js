const addToCartModel = require("../models/addToCartModel");

const addToCartViewProduct = async (req, res) => {
    try {
        const currentUser = req.userId; // Assuming you have middleware or some mechanism to get userId from request
        const allProducts = await addToCartModel.find({ userId: currentUser }).populate("productId");
        res.json({
            data: allProducts,
            success: true,
            error: false
        });
    } catch (error) {
        res.status(400).json({
            message: error.message || "Error fetching products from cart",
            error: true,
            success: false
        });
    }
};

module.exports = addToCartViewProduct;
