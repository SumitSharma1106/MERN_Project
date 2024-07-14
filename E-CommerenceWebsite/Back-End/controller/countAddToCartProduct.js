const addToCartModel = require("../models/addToCartModel");

const countAddToCartProduct = async(req,res)=>{
    try{
        const userId = req.userId
        const count = await addToCartModel.countDocuments({
            userId : userId
        })
        res.json({
            data: {
                count : count
            },
            message : "Ok",
            success: true,
            error : false
        })
    }
    catch(e){
        res.status(400).json({
            message: e.message || e,
            error: true,
            success: false
        });
    }
}


module.exports = countAddToCartProduct