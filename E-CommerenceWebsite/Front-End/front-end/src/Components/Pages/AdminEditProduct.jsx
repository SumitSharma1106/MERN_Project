import { Autorenew, Close, CloudUpload, Delete } from '@mui/icons-material';
import React, { useState } from 'react';
import productCategory from '../ImagerHelper/ProductCategory';
import uploadImage from '../ImagerHelper/UploadImage';
import { Button } from '@mui/material';
import DisplayImage from '../ImagerHelper/DisplayImage';
import SummaryApi from '../../Common';
import { toast } from 'react-toastify';

const AdminEditProduct = ({ onClose, productData,fetchData }) => {
  const [data, setData] = useState({
    ...productData,
    productName: productData.productName,
    brandName: productData.brandName,
    category: productData.category,
    productImage: productData.productImage || [],
    description: productData.description,
    price: productData.price,
    sellingPrice: productData.sellingPrice
  });

  const [openFullScreenImage, setOpenFullScreenImage] = useState(false);
  const [fullScreenImage, setFullScreenImage] = useState("");

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleUploadProduct = async (e) => {
    try {
      const file = e.target.files[0];
      const uploadImageCloudinary = await uploadImage(file);
      setData((prev) => ({
        ...prev,
        productImage: [...prev.productImage, uploadImageCloudinary.url],
      }));
    } catch (error) {
      console.error("Error uploading image: ", error);
    }
  };

  const handleDeleteChange = (index) => {
    const newProductImage = [...data.productImage];
    newProductImage.splice(index, 1);
    setData((prev) => ({
      ...prev,
      productImage: newProductImage,
    }));
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    const response = await fetch(SummaryApi.updateProduct.url,{
      method: SummaryApi.updateProduct.method,
      credentials : "include",
      headers : {
        "content-type": "application/json"
      },
      body : JSON.stringify(data)
    })

    const responseData = await response.json()
    if(responseData.success){
      toast.success(responseData?.message)
      onClose()
      fetchData()
    }
    if(responseData.error){
      toast.error(responseData?.message)
    }
  };

  return (
    <div className='fixed top-0 bottom-0 right-0 left-0 bg-slate-300 bg-opacity-55 flex justify-center items-center'>
      <div className='bg-white rounded shadow-lg w-full max-w-[60vw] max-h-[80vh] overflow-y-auto scrollbar scrollbar-thumb-rounded scrollbar-thumb-gray-500 scrollbar-track-gray-300'>
        <div className='flex justify-between items-center p-4'>
          <h2 className='text-xl mb-0 font-bold'>Upload Product</h2>
          <div className='cursor-pointer p-2 text-red-600' onClick={onClose}>
            <Close />
          </div>
        </div>

        <form className='grid gap-4 p-4 text-lg' onSubmit={handleSubmit}>
          <label htmlFor="productName" className='font-semibold'>Product Name:</label>
          <input
            type="text"
            placeholder='Enter product name...'
            name='productName'
            value={data.productName}
            onChange={handleOnChange}
            className='outline-blue-300 border-none px-1 py-2 bg-slate-100'
            required
          />

          <label htmlFor="brandName" className='font-semibold'>Brand Name:</label>
          <input
            type="text"
            placeholder='Enter brand name...'
            name='brandName'
            value={data.brandName}
            onChange={handleOnChange}
            className='outline-green-300 border-none px-1 py-2 bg-slate-100'
            required
          />

          <label htmlFor="category">Category:</label>
          <select
            name="category"
            value={data.category}
            onChange={handleOnChange}
            className='outline-blue-300 border-none px-1 py-2 bg-slate-100'
            required
          >
            <option value="" key="default">Select Category</option>
            {productCategory.map((el, index) => (
              <option value={el.value} key={index}>
                {el.label}
              </option>
            ))}
          </select>

          <label htmlFor="productImage">Product Image</label>
          <label htmlFor="uploadImageInput">
            <div className='p-2 bg-slate-200 border rounded h-40 w-full text-gray-400 flex justify-center items-center flex-col gap-2 cursor-pointer'>
              <CloudUpload style={{ fontSize: '3em', color: 'grey' }} />
              <p className='text-sm'>Upload Product Image</p>
              <input
                type="file"
                id="uploadImageInput"
                className='hidden'
                onChange={handleUploadProduct}
              />
            </div>
          </label>

          {data.productImage.length > 0 ? (
            <div className='flex gap-2 p-2 overflow-x-auto'>
              {data.productImage.map((el, index) => (
                <div key={index} className="relative border border-black group bg-slate-200">
                  <img
                    src={el}
                    alt={`Product ${index}`}
                    width={100}
                    height={120}
                    className='hover cursor-pointer'
                    onClick={() => {
                      setOpenFullScreenImage(true);
                      setFullScreenImage(el);
                    }}
                  />
                  <div className='absolute bottom-0 right-0 hover:text-red-600 hover:text-xl group-hover:block' onClick={() => handleDeleteChange(index)}>
                    <Delete className='cursor-pointer' sx={{ fontSize: '0.9em' }} />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className='text-red-500 text-sm font-semibold'>*Please upload product image</p>
          )}

          <label htmlFor="price" className='font-semibold'>Price:</label>
          <input
            type="number"
            step="any"
            placeholder='Enter price...'
            name='price'
            value={data.price}
            onChange={handleOnChange}
            className='outline-black outline-2 border-none px-1 py-2 bg-slate-100'
            required
          />
          <label htmlFor="sellingPrice" className='font-semibold'>Selling Price:</label>
          <input
            type="number"
            step="any"
            placeholder='Enter selling price...'
            name='sellingPrice'
            value={data.sellingPrice}
            onChange={handleOnChange}
            className='outline-black outline-2 border-none px-1 py-2 bg-slate-100'
            required
          />

          <label htmlFor="description" className='font-semibold'>Description:</label>
          <textarea
            name="description"
            id="description"
            rows={3}
            value={data.description}
            onChange={handleOnChange}
            className='h-28 p-1 bg-slate-100 overflow-y-auto mb-4'
            placeholder='Enter product description... '
          />

          <Button type="submit" variant='contained' startIcon={<Autorenew/>} sx={{ fontWeight: '600', backgroundColor: 'red', padding: '4px' }}>
            Update Product
          </Button>
        </form>
      </div>

      {openFullScreenImage && (
        <DisplayImage onClose={() => setOpenFullScreenImage(false)} imgUrl={fullScreenImage} />
      )}
    </div>
  );
};

export default AdminEditProduct;
