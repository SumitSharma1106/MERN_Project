const addToCartModel = require("../models/addToCartModel");

const updateAddToCartProduct = async (req, res) => {
    try {
        const currentUserId = req.userId;
        const addToCartProductId = req.body._id;
        const qty = req.body.quantity;
        
        const updateProduct = await addToCartModel.updateOne(
            { _id: addToCartProductId, userId: currentUserId },
            { ...(qty && { quantity: qty }) }
        );
        
        res.json({
            message: "Product Updated",
            data: updateProduct,
            success: true,
            error: false
        });
    } catch (e) {
        res.status(400).json({
            message: e.message || "Error fetching products from cart",
            error: true,
            success: false
        });
    }
};

module.exports = updateAddToCartProduct;
