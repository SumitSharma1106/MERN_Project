import React, { useEffect, useRef, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import fetchCategoryWise from '../ImagerHelper/fetchCategoryWise';
import DisplayCurrency from '../ImagerHelper/DisplayCurrency';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import Context from '../../context';
import { addToCart } from '../../Components/ImagerHelper/AddToCart';

const HorizontalCartProduct = ({ category, heading }) => {
    const [data, setData] = useState([]);
    const [translateX, setTranslateX] = useState(0);
    const scrollElement = useRef(null);
    const { fetchUserAddCart } = useContext(Context);

    const handleAddCart = async (e, id) => {
        e.preventDefault();
        await addToCart(id);
        fetchUserAddCart();
    };

    const fetchData = async () => {
        try {
            const categoryProduct = await fetchCategoryWise(category);
            setData(categoryProduct?.data || []);
        } catch (error) {
            console.error('Error fetching data:', error);
            setData([]); // Handle error state or default data
        }
    };

    useEffect(() => {
        fetchData();
    }, [category]);

    useEffect(() => {
        // Reset translateX when data changes to ensure correct initial position
        setTranslateX(0);
    }, [data]);

    const scrollRight = () => {
        const containerWidth = scrollElement.current.clientWidth;
        const maxTranslateX = -(scrollElement.current.scrollWidth - containerWidth);
        
        if (translateX > maxTranslateX) {
            setTranslateX(prev => prev - 300);
        }
    };

    const scrollLeft = () => {
        if (translateX < 0) {
            setTranslateX(prev => prev + 300);
        }
    };

    return (
        <div className="container mx-auto px-4 my-6">
            <h2 className="text-base md:text-xl font-semibold py-2 my-6">{heading}</h2>

            <div className="relative overflow-hidden shadow-md p-4">
                <div className="absolute inset-y-0 left-0 flex items-center z-10">
                    {translateX < 0 && (
                        <button className="bg-white rounded-full p-1" onClick={scrollLeft}>
                            <ChevronLeft style={{ fontSize: '42px' }} />
                        </button>
                    )}
                </div>
                <div className="absolute inset-y-0 right-0 flex items-center z-10">
                    <button className="bg-white rounded-full p-1" onClick={scrollRight}>
                        <ChevronRight style={{ fontSize: '42px' }} />
                    </button>
                </div>

                <div
                    className="flex gap-4 transition-transform duration-300"
                    style={{ transform: `translateX(${translateX}px)` }}
                    ref={scrollElement}
                >
                    {data.map((product, index) => (
                        <div key={index} className="h-48 border-t-2 p-4 shadow-md flex-none">
                            <Link to={`/productDetails/${product?._id}`} className="p-2 h-full flex flex-row cursor-pointer z-0">
                                <div className="w-[140px] h-full flex-shrink-0">
                                    <img src={product.productImage[0]} alt={product.name} className="w-full h-full object-cover" />
                                </div>
                                <div className="flex flex-col p-2">
                                    <p className="font-semibold p-1 overflow-hidden whitespace-nowrap text-ellipsis">{product?.productName}</p>
                                    <p className="capitalize">{product?.category}</p>
                                    <div className="flex gap-2 items-center">
                                        <p className="font-semibold text-red-500"><DisplayCurrency num={product?.sellingPrice} /></p>
                                        <p className="text-gray-400 line-through text-sm"><DisplayCurrency num={product?.price} /></p>
                                    </div>
                                    <button className="bg-red-500 text-white py-1 px-3 mt-auto rounded-full font-semibold cursor-pointer" onClick={(e) => handleAddCart(e, product?._id)}>Add to Cart</button>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default HorizontalCartProduct;
