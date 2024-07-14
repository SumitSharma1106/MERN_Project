import React, { useState, useEffect } from 'react';
import SummaryApi from '../../Common';
import DisplayCurrency from '../ImagerHelper/DisplayCurrency';
import { Button } from '@mui/material';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { Close } from '@mui/icons-material';

const PaymentSlip = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate()

  const fetchData = async () => {
    try {
      const response = await fetch(SummaryApi.addToCartProductView.url, {
        method: SummaryApi.addToCartProductView.method,
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const responseData = await response.json();
      if (responseData.success) {
        setData(responseData.data);
      }
    } catch (error) {
      console.error('Error fetching cart data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []); // Run once on component mount

  const handleBuyNow = () => {
    toast.success("You Buy Now Successfully")
    navigate("/")
  }
  const handleClose = () =>{
    navigate("/cart")
  }

  // Calculate total quantity of items in the cart
  const totalQuantity = data.length ? data.reduce((total, product) => total + product.quantity, 0) : 0;
  const totalPrice = data.reduce((total, product) => total + (product.quantity * product?.productId?.sellingPrice), 0);

  return (
    <div className="fixed inset-0 bg-gray-400 flex justify-center items-center">
      <div className="w-[50vw] bg-white h-[96vh] overflow-y-auto p-4 border-2 border-black relative">
        <div className='flex justify-end hover:text-red-600'>
          <Close style={{ fontSize: '30px', cursor:'pointer' }} onClick={handleClose}/>
        </div>

        <h2 className="text-center text-3xl font-bold">Payment Slip</h2>
        <div className='flex justify-end text-lg font-bold text-red-600 gap-2'>
          <p>Total Price:</p>
          <p><DisplayCurrency num={totalPrice} /></p>
        </div>
        <div className="mt-4">
          {data.map((item, index) => (
            <div key={index} className="mb-4 p-2 border-b">
              <div className="flex flex-row justify-between">
                <div>
                  <div className="text-2xl flex gap-4">
                    <p className="font-semibold">Product Name: </p>
                    <p>{item.productId.productName}</p>
                  </div>
                  <div className="text-2xl flex gap-4">
                    <p className="font-semibold">Quantity: </p>
                    <p>{item.quantity}</p>
                  </div>
                  <div className="text-xl flex gap-4">
                    <p className="font-semibold">Individual Price: </p>
                    <p><DisplayCurrency num={item.productId.sellingPrice} /></p>
                  </div>
                  <div className="text-2xl flex gap-4 font-semibold">
                    <p>Total Price: </p>
                    <p><DisplayCurrency num={item.productId.sellingPrice * item.quantity} /></p>
                  </div>
                </div>
                {item.productId.productImage && item.productId.productImage[0] && (
                  <div className="w-[10vw] h-full">
                    <img src={item.productId.productImage[0]} alt={item.productId.productName} />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
        <div className="fixed bottom-4 left-0 right-0 flex justify-center px-2" onClick={handleBuyNow}>
          <Button variant='contained' style={{ backgroundColor: 'red', width: "50vw" }} >Buy Now</Button>
        </div>
      </div>
    </div>
  );
};

export default PaymentSlip;
