const backenedDomain ="http://localhost:8080"
const SummaryApi = {
    signUp : {
        url : `${backenedDomain}/api/signup`,
        method : "post"
    },
    signIn : {
        url : `${backenedDomain}/api/signin`,
        method : "post"
    },
    current_user : {
        url : `${backenedDomain}/api/user-details`,
        method : "get"
    },
    logout_user : {
        url : `${backenedDomain}/api/userLogout`,
        method : "get"
    },
    allUser : {
        url : `${backenedDomain}/api/all-users`,
        method : "get"
    },
    updateUser : {
        url : `${backenedDomain}/api/update-user`,
        method : "post"
    },
    uploadProduct :{
        url : `${backenedDomain}/api/upload-product`,
        method : "post"
    },
    allProduct : {
        url : `${backenedDomain}/api/all-product`,
        method : "get"
    },
    updateProduct:{
        url : `${backenedDomain}/api/update-product`,
        method : "post"
    },
    categoryProduct:{
         url : `${backenedDomain}/api/get-categoryProduct`,
        method : "get"
    },
    categoryWiseProduct:{
        url: `${backenedDomain}/api/get-categoryWiseProduct`,
        method : "post"
    },
    productDetails : {
        url :`${backenedDomain}/api/product-details`,
        method : "post"
    },
    searchProduct : {
        url :`${backenedDomain}/api/searchProducts`,
        method : "get"
    },
    addToCartProduct: {
        url :`${backenedDomain}/api/addToCart`,
        method : "post"
    },
    addToCartProductCount :{
        url :`${backenedDomain}/api/countAddToCartProduct`,
        method : "get" 
    },
    addToCartProductView :{
        url :`${backenedDomain}/api/view-card-product`,
        method : "get" 
    },
    updateCartProduct : {
        url :`${backenedDomain}/api/update-cart-product`,
        method : "post"  
    },
    deleteCartProduct : {
        url :`${backenedDomain}/api/delete-cart-product`,
        method : "post"  
    },
    filterProduct : {
        url :`${backenedDomain}/api/filter-product`,
        method : "post"  
    }

}

export default SummaryApi