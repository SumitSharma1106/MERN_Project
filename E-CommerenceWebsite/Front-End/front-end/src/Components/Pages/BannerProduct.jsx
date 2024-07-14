import React, { useEffect, useState } from 'react';
import Headphone_Banner from '../../assets/Banner/Headphone_Banner.png';
import banner_1 from '../../assets/Banner/banner_1.png'
import banner_2 from '../../assets/Banner/banner_2.png';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';

const BannerProduct = () => {
  const [currentImage,setCurrentImage] = useState(0)
  const desktopImages = [
    Headphone_Banner,
    banner_1,
    banner_2,
  ];
  const nextImage = () =>{
    if(desktopImages.length-1>currentImage){
    setCurrentImage(prev=>prev+1)
    }
  }
  const prevImage = () =>{
    if(currentImage!=0){
    setCurrentImage(prev=>prev-1)
    }
  }
  useEffect(()=>{
      const interval = setInterval(()=>{
        if(desktopImages.length-1>currentImage){
          nextImage()
        }
        else{
          setCurrentImage(0)
        }
      },4000)
      return () =>clearInterval(interval)
  },[currentImage])
  return (
    <div className='container mx-auto md:px-6 px-2 rounded '>
      <div className=' h-[36vh] md:h-[65vh] md:w-full bg-slate-200 relative overflow-hidden'>
        <div className='absolute z-10 w-full h-full  md:flex items-center hidden'>
          <div className=' justify-between w-full flex' >
          <button onClick={prevImage}  className='bg-white rounded-full '>
            <ChevronLeft style={{fontSize:'42px'}}/>
          </button>
          <button onClick={nextImage} className='bg-white rounded-full '>
            <ChevronRight style={{fontSize:'42px'}}/>
          </button>
          </div>
        </div>
       <div className='flex h-full w-full'>
       {
          desktopImages.map((imageURL, index) => (
            <div className='w-full h-full min-h-full min-w-full transition-all' key={index} style={{transform:`translateX(-${currentImage * 100 }%)`}}>
              <img src={imageURL} alt="" className='w-full h-full' />
            </div>
          ))
        }
       </div>
      </div>
    </div>
  );
}

export default BannerProduct;
