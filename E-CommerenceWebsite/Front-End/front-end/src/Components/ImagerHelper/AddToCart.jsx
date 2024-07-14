import { toast } from "react-toastify";
import SummaryApi from "../../Common";

export const addToCart = async (productId) => {
    try {
        const response = await fetch(SummaryApi.addToCartProduct.url, {
            method: SummaryApi.addToCartProduct.method,
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ productId })
        });

        const responseData = await response.json();

        if (responseData.success) {
            toast.success(responseData.message);
        } else {
            toast.error(responseData.message);
        }
    } catch (error) {
        console.error("Error adding to cart:", error);
        toast.error("Failed to add to cart. Please try again later.");
    }
};
