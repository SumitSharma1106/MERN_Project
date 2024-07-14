// models/addToCartModel.js
const mongoose = require('mongoose');

const addToCartSchema = mongoose.Schema({
    productId: {
        ref : "product",
        type : String
    },
    quantity: {
        type: Number,
        default: 1
    },
    userId: String
}, {
    timestamps: true
});

const addToCartModel = mongoose.model("addToCart", addToCartSchema);
module.exports = addToCartModel;
