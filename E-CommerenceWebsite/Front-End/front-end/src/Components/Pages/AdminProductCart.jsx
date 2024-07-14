import { Edit } from '@mui/icons-material';
import React, { useState } from 'react';
import AdminEditProduct from './AdminEditProduct';
import DisplayCurrency from '../ImagerHelper/DisplayCurrency';

const AdminProductCart = ({ data, fetchData }) => {
  const [editProduct, setEditProduct] = useState(false);

  const handleEditClick = () => {
    setEditProduct(true);
  };

  const handleClose = () => {
    setEditProduct(false);
  };

  return (
    <div className="bg-white p-2 rounded shadow shadow-gray-400 ">
      <img 
        src={data?.productImage[0]} 
        alt={data?.productName} 
        width={140} 
        height={100}
        className="mx-auto"
      />
      <div className='text-center'>
        <h1 className="text-center text-lg font-semibold w-[200px] overflow-hidden whitespace-nowrap text-ellipsis">{data?.productName}</h1>
        <div className='font-semibold '>
          <DisplayCurrency num={data?.sellingPrice} />
        </div>
        <div className='text-end mr-4 text-xs line-through'>
          <DisplayCurrency num={data?.price} />
        </div>
      </div>
      <div className="w-fit ml-auto text-right hover:text-white">
        <button
          className="text-black bg-slate-200 hover:bg-green-500 hover:text-white rounded-full w-10 h-10 flex items-center justify-center"
          onClick={handleEditClick}
        >
          <Edit style={{ fontSize: '16px' }} />
        </button>
      </div>
      {editProduct && (
        <AdminEditProduct productData={data} onClose={handleClose} fetchData={fetchData} />
      )}
    </div>
  );
};

export default AdminProductCart;
