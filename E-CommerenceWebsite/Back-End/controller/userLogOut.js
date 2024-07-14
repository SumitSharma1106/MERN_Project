

async function userLogOutController(req,res){
    try{
        res.clearCookie("token")


        res.json({
            message: "Login Out Successfully",
            error: false,
            success: true,
            data: []
        })
    }
    catch(err){
        res.status(500).json({
            message: err.message,
            error: true,
            success: false,
          });
    }
}

module.exports = userLogOutController