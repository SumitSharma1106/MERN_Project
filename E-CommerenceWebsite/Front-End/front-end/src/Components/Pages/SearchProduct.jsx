// SearchProduct.jsx

import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import SummaryApi from '../../Common';
import CategoryWiseProduct from './CategoryWiseProduct';

const SearchProduct = () => {
  const location = useLocation();
  const [data, setData] = useState([]);
  const query = new URLSearchParams(location.search).get('q');

  const fetchProduct = async () => {
    try {
      const response = await fetch(`${SummaryApi.searchProduct.url}?q=${query}`);
      const dataResponse = await response.json();
      setData(dataResponse.data);
    } catch (error) {
      console.error('Error fetching data:', error);
      setData([]);
    }
  };

  useEffect(() => {
    if (query) {
      fetchProduct();
    }
  }, [query]);

  // Accessing the first product directly
  const product = data.length > 0 ? data[0] : null;

  return (
    <div className='container mx-auto p-4'>
      <p className='text-xl font-semibold'>Search Results: {product ? data.length : 0}</p>
      
      {!data && (
        <p className='bg-slate-200 text-2xl text-center'>No Product Found...</p>
      )}
      {product && (
        <CategoryWiseProduct 
          category={product.category} 
          heading={product.category} 
          imageUrl={product.productImage?.[0]} 
        />
      )}
    </div>
  );
};

export default SearchProduct;
