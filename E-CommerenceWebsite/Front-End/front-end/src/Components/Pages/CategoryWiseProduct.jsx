import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import fetchCategoryWise from '../ImagerHelper/fetchCategoryWise';
import DisplayCurrency from '../ImagerHelper/DisplayCurrency';
import Context from '../../context';
import { addToCart } from '../ImagerHelper/AddToCart';

const CategoryWiseProduct = ({ category, heading }) => {
  const [uniqueProducts, setUniqueProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { fetchUserAddCart } = useContext(Context);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoryProducts = await fetchCategoryWise(category);
        
        // Use a Set to store unique product IDs
        const uniqueProductIds = new Set();
        const uniqueProductsArray = [];

        // Iterate through products and add to array only if not already added
        categoryProducts.data.forEach(product => {
          if (!uniqueProductIds.has(product._id)) {
            uniqueProductIds.add(product._id);
            uniqueProductsArray.push(product);
          }
        });

        setUniqueProducts(uniqueProductsArray);
      } catch (error) {
        console.error('Error fetching data:', error);
        // Handle error state or default data
        setUniqueProducts([]); 
      } finally {
        setLoading(false); // Always set loading to false, whether success or error
      }
    };

    // Fetch data only once when component mounts or when category prop changes
    fetchData();
  }, [category]);

  const handleAddToCart = async (e, productId) => {
    e.preventDefault();
    try {
      await addToCart(productId);
      fetchUserAddCart(); // Update cart in context
      console.log('Adding product to cart:', productId);
    } catch (error) {
      console.error('Error adding to cart:', error);
      // Handle error adding to cart
    }
  };

  return (
    <div className="container mx-auto px-4 my-6">
      <h2 className="text-xl font-semibold py-2 my-6 capitalize">{heading}</h2>

      {loading ? (
        <p>Loading...</p> // Add a loading indicator if needed
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {uniqueProducts.map((product, index) => (
            <div key={index} className="border border-gray-200 rounded-lg overflow-hidden shadow-md flex flex-col justify-between">
              <Link to={`/productDetails/${product._id}`} className="block">
                <div className="w-full h-56 overflow-hidden flex justify-center">
                  <img
                    src={product.productImage?.[0] || 'fallback-image-url.jpg'}
                    alt={product.name || 'No image available'}
                    className="w-full h-full object-fit"
                  />
                </div>
                <div className="p-2 flex flex-col justify-center items-center">
                  <p className="font-semibold text-xl text-center mb-2">{product?.productName}</p>
                  <p className="text-gray-600 mb-2 text-center">{product?.category}</p>
                  <div className="flex justify-center items-center">
                    <p className="text-red-500 font-semibold mr-2"><DisplayCurrency num={product?.sellingPrice} /></p>
                    <p className="text-gray-400 line-through text-sm"><DisplayCurrency num={product?.price} /></p>
                  </div>
                </div>
              </Link>
              <div className="p-2 flex justify-center">
                <button className="bg-red-500 text-white py-1 px-1 mt-auto rounded-full font-semibold cursor-pointer" onClick={(e) => handleAddToCart(e, product?._id)}>Add to Cart</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryWiseProduct;
