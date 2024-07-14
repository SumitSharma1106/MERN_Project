const express = require('express');
const router = express.Router();
const userSignUpController = require('../controller/userSignUp');
const userSignInController = require('../controller/userSignIn');
const userDetailController = require('../controller/userDetail');
const authToken = require('../middleWare/authToken');
const userLogOutController = require('../controller/userLogOut');
const allUserController = require('../controller/allUser');
const updateUserController = require('../controller/updateUser');
const uploadProductController = require('../controller/uploadProduct');
const getProductController = require('../controller/getProduct');
const updateProductController = require('../controller/updateProduct');
const getCategoryProduct = require('../controller/getCategoryProduct');
const getCategoryWiseProduct = require('../controller/getCategoryWiseProduct');
const getProductDetail = require('../controller/getProductDetail');
const addToCartController = require('../controller/addToCartController');
const countAddToCartProduct = require('../controller/countAddToCartProduct');
const addToCartViewProduct = require('../controller/addToCartViewProduct');
const updateAddToCartProduct = require('../controller/updateAddToCartProduct');
const deleteAddToCartProduct = require('../controller/deleteAddToCartProduct');
const searchProduct = require('../controller/searchProduct');
const filterProductController = require('../controller/filterProduct');

router.post("/signup", userSignUpController);
router.post("/signin",userSignInController);
router.get("/user-details",authToken,userDetailController);
router.get("/userLogout",userLogOutController);

// Admin Panel Api
router.get("/all-users",authToken,allUserController)
router.post("/update-user",authToken,updateUserController)

// Upload Product
router.post("/upload-product",authToken,uploadProductController)
router.get("/all-product",getProductController)
router.post("/update-product",authToken,updateProductController)

// Get Products
router.get("/get-categoryProduct",getCategoryProduct)
router.post("/get-categoryWiseProduct",getCategoryWiseProduct)
router.post("/product-details",getProductDetail)
router.get("/searchProducts",searchProduct)
router.post("/filter-product",filterProductController)

// Add To Cart
router.post("/addToCart",authToken,addToCartController)
router.get("/countAddToCartProduct",authToken,countAddToCartProduct)
router.get("/view-card-product",authToken,addToCartViewProduct)
router.post("/update-cart-product",authToken,updateAddToCartProduct)
router.post("/delete-cart-product",authToken,deleteAddToCartProduct)

module.exports = router;
