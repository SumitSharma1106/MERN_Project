import React, { useEffect, useState } from 'react';
import SummaryApi from '../../Common';
import DisplayCurrency from '../ImagerHelper/DisplayCurrency';
import { Delete } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate()
  const fetchData = async () => {
    try {
      const response = await fetch(SummaryApi.addToCartProductView.url, {
        method: SummaryApi.addToCartProductView.method,
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
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

  const updateQty = async (id, qty) => {
    try {
      const response = await fetch(SummaryApi.updateCartProduct.url, {
        method: SummaryApi.updateCartProduct.method,
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ _id: id, quantity: qty })
      });
      const responseData = await response.json();
      if (responseData.success) {
        fetchData();
      }
    } catch (error) {
      console.error('Error updating cart quantity:', error);
    }
  };

  const increaseQty = (id, qty) => {
    updateQty(id, qty + 1);
  };

  const decreaseQty = (id, qty) => {
    if (qty > 1) {
      updateQty(id, qty - 1);
    }
  };
  const handleOnPayment = () =>{
    navigate("/payment")
  }

  const deleteCartProduct = async (id) => {
    try {
      const response = await fetch(SummaryApi.deleteCartProduct.url, {
        method: SummaryApi.deleteCartProduct.method,
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ _id: id })
      });
      const responseData = await response.json();
      if (responseData.success) {
        fetchData();
      }
    } catch (error) {
      console.error('Error deleting cart product:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []); // Run once on component mount

  // Calculate total quantity of items in the cart
  const totalQuantity = data.reduce((total, product) => total + product.quantity, 0);

  // Calculate total price of all items in the cart
  const totalPrice = data.reduce((total, product) => total + (product.quantity * product?.productId?.sellingPrice), 0);

  return (
    <div className='container mx-auto p-4'>
      <p className='font-bold text-4xl'>In Cart</p>
      <div className='flex text-xl font-bold gap-4'>
        <p>Total Product: </p>
        <p>{data.length}</p>
      </div>
      <div>
        {data.length === 0 && (
          <p className='text-xl'>No Product in your cart</p>
        )}
      </div>
      {data.length !== 0 && (
        <div className='flex h-[76vh] w-full overflow-hidden'>
          <div className='flex flex-col bg-gray-100 w-full'>
            <div className='flex w-full h-full gap-2 '>
              <div className='w-[70vw] border-2 overflow-x-auto'>
                {/* Render your cart products or other content here */}
                {data.map((product) => (
                  <div key={product._id} className='h-36 bg-white flex m-2 gap-4'>
                    <div className='flex items-center justify-center w-[15vw] gap-2 border-x-2 border-gray-300 p-1'>
                      <img src={product?.productId?.productImage[0]} alt={product?.productId?.productName} className='h-full object-cover' />
                    </div>
                    <div className='text-center w-[20vw] flex flex-col justify-center border-x-2'>
                      <p className='font-semibold text-lg h-8 whitespace-nowrap text-ellipsis overflow-hidden w-[15vw]'>{product?.productId?.productName}</p>

                      <p className='capitalize w-[18vw]'>{product.productId.category}</p>
                      <p className='text-xl text-red-600 font-semibold'><DisplayCurrency num={product?.productId.sellingPrice} /></p>
                      <div className="w-full flex justify-center gap-2 font-semibold">
                        <button
                          className="border-2 border-red-600 px-2 hover:bg-red-600 hover:text-white"
                          onClick={() => decreaseQty(product._id, product.quantity)}
                        >
                          -
                        </button>
                        {product.quantity}
                        <button
                          className="border-2 border-red-600 px-2 hover:bg-red-600 hover:text-white"
                          onClick={() => increaseQty(product._id, product.quantity)}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className='w-[60vw] flex justify-end p-4'>
                      <div className='flex h-full items-center text-lg font-semibold'>
                        <DisplayCurrency num={product.productId.sellingPrice * product.quantity} />
                      </div>
                      <div className='hover:text-red-600 cursor-pointer' onClick={() => deleteCartProduct(product._id)}>
                        <Delete />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className='w-[30vw] bg-white h-[30vh]'>
                {/* Additional cart summary or details can be added here */}
                <h3 className='bg-red-600 text-white font-bold p-2 text-lg'>Summary</h3>
                <div className="flex p-4 text-2xl flex-col gap-8">
                  <div className='flex justify-between font-semibold'>
                    <p>Total Quantity: </p>
                    <p className='text-red-600'>{totalQuantity}</p>
                  </div>
                  <div className='flex justify-between font-semibold'>
                    <p>Total Price: </p>
                    <p className='text-red-600'><DisplayCurrency num={totalPrice} /></p>
                  </div>
                </div>
                <div className='flex justify-center text-xl' onClick={handleOnPayment}>

                  <button className='bg-blue-600 text-white w-full p-2 font-semibold'>
                    Payment
                  </button>

                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
