const userModel = require("../models/userModel")


async function userDetailController(req,res){
    try{
        console.log('user-id: ',req.user._id)
        const user = await userModel.findById(req.user._id)
        console.log("Hello :",user)

        res.status(200).json({
            data : user,
            error : false,
            success: true,
            message : "User Details"
        })
    }
    catch(e){
        res.status(400).json({
            message : e.message || e,
            error: true,
            success: false
        })
    }
}
module.exports = userDetailController