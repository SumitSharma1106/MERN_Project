const addToCartModel = require("../models/addToCartModel");

const deleteAddToCartProduct = async (req, res) => {
    try {
        const currentUserId = req.userId;
        const addToCartProductId = req.body._id;
        const deleteProduct = await addToCartModel.deleteOne({ _id: addToCartProductId, userId: currentUserId });

        res.json({
            message: "Product Deleted Successfully",
            success: true,
            error: false,
            data: deleteProduct
        });
    } catch (e) {
        res.status(400).json({
            message: e.message || "Error deleting product from cart",
            error: true,
            success: false
        });
    }
}

module.exports = deleteAddToCartProduct;
