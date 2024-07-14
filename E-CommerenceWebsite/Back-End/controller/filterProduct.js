const productModel = require("../models/productModel");

const filterProductController = async(req,res)=>{
    try{
            const categoryList = req?.body?.category || []
            const product = await productModel.find({
                category : {
                    "$in" : categoryList
                }
                    
            })
            res.json({
                data : product,
                message : "Category List Successfully",
                success: true,
                error : false
            })
    }
    catch(e){
        res.status(400).json({
            message: e.message || "Error fetching product list",
            error: true,
            success: false
          });
    }
}

module.exports = filterProductController