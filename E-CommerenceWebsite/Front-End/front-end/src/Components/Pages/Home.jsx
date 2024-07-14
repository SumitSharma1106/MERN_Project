import React from 'react';
import Headphone_Banner from '../../assets/Banner/Headphone_Banner.png';
import CategoryList from './CategoryList';
import BannerProduct from './BannerProduct';
import HorizontalCartProduct from './HorizontalCartProduct';
import VerticalCartProduct from './VerticalCartProduct';

const Home = () => {
  return (
    <>
      <CategoryList/>
      <BannerProduct/>
      <HorizontalCartProduct category={"airpods"} heading={
        "Top's Airpods"
      }/>
     <HorizontalCartProduct category={"earphones"} heading={
        "Earphones"
      }/>
      <VerticalCartProduct category={"mobiles"} heading={"Mobiles"}/>
      <VerticalCartProduct category={"camera"} heading={"Camera"}/>
      <HorizontalCartProduct category={"mouse"} heading={
        "Mouse"
      }/>

    </>
  );
};
// category={"airpods"} 
export default Home;
