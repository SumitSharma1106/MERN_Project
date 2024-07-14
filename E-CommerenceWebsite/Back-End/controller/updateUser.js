const userModel = require("../models/userModel");

async function updateUserController(req, res) {
  try {
    const sessionUser = req.user._id;

    // Check if sessionUser is null or undefined
    if (!sessionUser) {
      throw new Error("Session user ID not provided or invalid");
    }

    const { userId, email, name, role } = req.body;

    const payload = {
      ...(email && { email: email }),
      ...(name && { name: name }),
      ...(role && { role: role }),
    };

    // Find the session user to ensure they have permissions
    const sessionUserDetails = await userModel.findById(sessionUser);
    if (!sessionUserDetails) {
      throw new Error("Session user not found");
    }

    // Update the user with the given userId
    const updateUser = await userModel.findByIdAndUpdate(userId, payload, { new: true });
    if (!updateUser) {
      throw new Error("User to update not found");
    }

    res.json({
      data: updateUser,
      message: "User Updated",
      success: true,
      error: false,
    });
  } catch (err) {
    console.error('Error in updateUserController:', err);
    res.status(400).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
}

module.exports = updateUserController;
