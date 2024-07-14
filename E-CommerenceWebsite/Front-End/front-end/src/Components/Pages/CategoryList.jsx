import React, { useEffect, useState } from 'react';
import SummaryApi from '../../Common'; // Ensure SummaryApi is correctly imported
import { Link } from 'react-router-dom';

const CategoryList = () => {
  const [categoryProducts, setCategoryProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchCategoryProducts = async () => {
    setLoading(true);
    try {
      const response = await fetch(SummaryApi.categoryProduct.url);
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const dataResponse = await response.json();
      setCategoryProducts(dataResponse.data);
    } catch (error) {
      console.error('Error fetching category products:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategoryProducts();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <div className="flex items-center gap-4 overflow-x-auto" style={{ "-ms-overflow-style": "none", "scrollbar-width": "none" }}>
        {loading ? (
          <div className="flex items-center justify-center min-h-screen">
            <div className="animate-spin rounded-full h-full w-[80%] border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          categoryProducts.map((product, index) => (
            <Link to={"/categoryProduct/" + product?.category} key={index} className="flex items-center flex-col cursor-pointer">
              <div className="w-16 h-16 md:w-24 md:h-24 rounded-full overflow-hidden bg-slate-200 flex justify-center items-center">
                <img src={product?.productImage[0]} alt={product?.category} className="h-full object-cover mix-blend-multiply hover:scale-105 transition-all" />
              </div>
              <p className="text-center text-sm md:text-base capitalize mt-2">{product?.category}</p>
            </Link>
          ))
        )}
      </div>
    </div>
  );
};

export default CategoryList;
