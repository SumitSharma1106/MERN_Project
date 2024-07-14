const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: String,
    profilePic: String, 
    role : String,// Ensure profilePic is included
}, {
    timestamps: true
});

const userModel = mongoose.model('User', userSchema); // Ensure the model name is capitalized

module.exports = userModel;
