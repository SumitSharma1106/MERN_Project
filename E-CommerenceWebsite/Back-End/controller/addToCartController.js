// controllers/addToCartController.js
const addToCartModel = require("../models/addToCartModel");

const addToCartController = async (req, res) => {
    try {
        const { productId } = req.body;
        const currentUser = req.user.userId; // Assuming you have user information in req.user

        // Check if the product already exists in the cart
        const isProductAvailable = await addToCartModel.findOne({ productId, userId: currentUser });

        if (isProductAvailable) {
            return res.json({
                message: "Product already exists in the cart",
                success: true,
                error: false
            });
        }

        // If product is not in cart, create a new cart item
        const newAddToCart = await addToCartModel.create({
            productId,
            userId: currentUser
        });

        res.json({
            message: "Product added to cart successfully",
            success: true,
            error: false,
            data: newAddToCart
        });
    } catch (e) {
        res.status(400).json({
            message: e.message || e,
            error: true,
            success: false
        });
    }
};

module.exports = addToCartController;
