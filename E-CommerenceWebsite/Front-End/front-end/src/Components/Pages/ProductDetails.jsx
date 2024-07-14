import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import SummaryApi from '../../Common'; // Adjust the import path as needed
import { Star, StarHalf } from '@mui/icons-material';
import DisplayCurrency from '../ImagerHelper/DisplayCurrency';
import VerticalCartProduct from './VerticalCartProduct';
import { toast } from 'react-toastify';



const ProductDetails = () => {
  const { id } = useParams(); // Destructure id directly from useParams
  const navigate = useNavigate()


  const [data, setData] = useState({
    productName: "",
    brandName: "",
    category: "",
    productImage: [],
    description: "",
    price: "",
    sellingPrice: ""
  });
  const [activeImage, setActiveImage] = useState("");
  const [zoomImage, setZoomImage] = useState(false);
  const [activeImageZoomCoordinate, setActiveImageZoomCoordinate] = useState({
    x: 0,
    y: 0
  });

  const fetchProductDetails = async () => {
    try {
      const response = await fetch(SummaryApi.productDetails.url, {
        method: SummaryApi.productDetails.method,
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          productId: id // Use id directly from useParams
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const dataResponse = await response.json();
      setData(dataResponse?.data);
      setActiveImage(dataResponse?.data?.productImage[0]);
    } catch (error) {
      console.error('Error fetching product details:', error);
      // Handle error state if needed
    }
  };

  useEffect(() => {
    fetchProductDetails();
  }, [id]); // Fetch product details when id changes

  const handleAddCart = () => {
    e.preventDefault()
    toast.error("This functionality does not added at that time")
};
  const handleClickImage = (imageURL) => {
    setActiveImage(imageURL);
  };
  const handleBuyProduct = () =>{
    navigate("/cart")
  }
  const handleZoomImage = useCallback((e) => {
    setZoomImage(true);
    const { left, top, width, height } = e.target.getBoundingClientRect();
    const x = (e.clientX - left) / width;
    const y = (e.clientY - top) / height;
    setActiveImageZoomCoordinate({ x, y });
  }, []);

  const handleZoomOutImage = () => {
    setZoomImage(false);
  };
  console.log(data)
  const discount = (((data?.price-data?.sellingPrice)/data?.price)*100)
  const approximate = Math.round(discount*10)/10
  console.log("Discount: ",discount)
  console.log("Approximate: ",approximate)
  return (
    <div className='grid gap-4'>
      <div className='container mx-auto p-4 flex flex-col lg:flex-row gap-8 h-[70vh]'>
        {/* Product Image */}
        <div className='lg:min-h-[200px] order-1 lg:order-none'>
          <div className='flex gap-2 flex-row lg:flex-col overflow-x-auto h-full'>
            {data.productImage.map((imageURL) => (
              <div className='h-24 w-24 rounded p-1 border-1 shadow-md' key={imageURL}>
                <img
                  src={imageURL}
                  alt=""
                  className='w-full h-full object-scale-down mix-blend-multiply cursor-pointer'
                  onClick={() => handleClickImage(imageURL)}
                />
              </div>
            ))}
          </div>
        </div>
        <div className='w-full lg:w-[58vw] h-[50vh] lg:h-[90vh] relative order-2 lg:order-none'>
          <div className="absolute flex items-center justify-center flex-col md:flex-row">
            <div className='relative'>
              <img
                src={activeImage}
                alt="Product Image"
                className="max-w-full max-h-full bg-slate-300"
                onMouseMove={handleZoomImage}
                onMouseLeave={handleZoomOutImage} // Deactivate zoom on mouse leave
              />
              {/* Zoom Functionality */}
              {zoomImage && (
                <div className='hidden lg:block absolute min-w-[500px] min-h-[500px] bg-white p-1 -right-[490px] top-0 z-10 overflow-hidden'>
                  <div
                    className='w-full h-full min-h-[440px] mix-blend-multiply scale-95'
                    style={{
                      backgroundImage: `url(${activeImage})`,
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: `${activeImageZoomCoordinate.x * 100}% ${activeImageZoomCoordinate.y * 100}%`
                    }}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
        <div className='w-full lg:w-[100%] h-[80vh] p-4 flex flex-col gap-4 order-3 lg:order-none '>
          <p className='text-lg bg-red-400 p-4 rounded-full w-36 text-gray-200'>{data?.brandName}</p>
          <p className='text-4xl font-semibold'>{data?.productName}</p>
          <p className='text-lg capitalize p-2 font-medium'>{data?.category}</p>
          <p className='text-orange-500'>
            <Star /><Star /><Star /><Star /><StarHalf />
          </p>
          <div>
            <div className='flex gap-2'>
            
            <p className='text-3xl font-bold text-red-600'>
              <DisplayCurrency num={data?.sellingPrice} />
            </p>
            <p className='text-xl font-bold text-slate-400'>
            ({approximate}%) Discount
            </p>
            </div>
            <p className='text-xl line-through ml-4 text-gray-400'>
              <DisplayCurrency num={data?.price} />
            </p>
          </div>
          <div className='flex gap-2'>
            <button className='bg-white text-red-600 border-2 border-red-600 p-2 rounded w-32 hover:bg-red-600 hover:text-white font-medium'  onClick={handleBuyProduct}>
              Buy
            </button>
            <button className="bg-red-600 text-white border-2 border-transparent p-2 rounded w-32 font-medium hover:bg-white hover:text-red-600 hover:border-red-600" onClick={handleAddCart}>
              Add to Cart
            </button>


          </div>
          <div className='text-gray-600'>
            <p className='text-xl'>Description</p>
            <p>{data?.description}</p>
          </div>
        </div>

      </div>
      <div>
        <VerticalCartProduct category={data.category} heading={"Similar Products"} />
      </div>
      {/* <div>
      <CategoryWiseProduct category={data.category} heading={"Similar Product" }/>
    </div> */}

    </div>
  );
};

export default ProductDetails;
