const productModel = require('../models/productModel');

async function updateProductController(req, res) {
    try {
        const { _id, ...updateFields } = req.body;

        // Ensure _id is provided and valid
        console.log("Hello")
        console.log(_id)
        if (!_id) {
            throw new Error('_id is required for update');
        }

        // Update the product in the database
        const updatedProduct = await productModel.findByIdAndUpdate(_id, updateFields, { new: true });

        if (!updatedProduct) {
            throw new Error('Product not found or could not be updated');
        }

        // Respond with success message and updated data
        res.json({
            success: true,
            message: 'Product updated successfully',
            data: updatedProduct,
        });
    } catch (err) {
        // Handle errors
        console.error('Error updating product:', err);
        res.status(400).json({
            success: false,
            error: err.message || 'Failed to update product',
        });
    }
}

module.exports = updateProductController;
