import { CloudUpload } from '@mui/icons-material';
import { Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import UploadProduct from './UploadProduct';
import SummaryApi from '../../Common';
import AdminProductCart from './AdminProductCart';

const AllProduct = () => {
  const [openUploadProduct, setOpenUploadProduct] = useState(false);
  const [allProduct, setAllProduct] = useState([]);

  const fetchAllProduct = async () => {
    const response = await fetch(SummaryApi.allProduct.url);
    const dataResponse = await response.json();
    setAllProduct(dataResponse.data || []);
  };

  useEffect(() => {
    fetchAllProduct();
  
  }, []);
  
  return (
    <div className='h-screen'>
      <div className='bg-white px-4 py-2 font-semibold w-full text-2xl flex justify-between'>
        <h2>All Products ({allProduct.length})</h2>
        
        <p>
          <Button
            variant='contained'
            style={{ backgroundColor: 'green', fontSize: '16px', fontWeight: '700' }}
            startIcon={<CloudUpload />}
            onClick={() => setOpenUploadProduct(true)}
          >
            Upload Product
          </Button>
        </p>
      </div>

      <div className='flex py-2 gap-4 w-[98%] flex-wrap h-[calc(100%-190px)] overflow-y-auto mt-4'>
        {allProduct.map((product, index) => (
          <AdminProductCart 
            data={product} 
            key={`${index}-allProduct`} 
            fetchData={fetchAllProduct}
          />
        ))}
      </div>

      {openUploadProduct && (
        <UploadProduct onClose={() => setOpenUploadProduct(false)} fetchData={fetchAllProduct} />
      )}
    </div>
  );
};

export default AllProduct;
