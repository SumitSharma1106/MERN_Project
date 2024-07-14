import React, { useContext, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import fetchCategoryWise from '../ImagerHelper/fetchCategoryWise';
import DisplayCurrency from '../ImagerHelper/DisplayCurrency';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import Context from '../../context';
import { addToCart } from '../../Components/ImagerHelper/AddToCart'; // Correct import

const VerticalCartProduct = ({ category, heading }) => {
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

    const scrollRight = () => {
        if (scrollElement.current) {
            const maxScrollLeft = scrollElement.current.scrollWidth - scrollElement.current.clientWidth;
            setTranslateX((prev) => {
                const newTranslateX = prev - 300;
                return Math.max(-maxScrollLeft, newTranslateX);
            });
        }
    };

    const scrollLeft = () => {
        setTranslateX((prev) => {
            const newTranslateX = prev + 300;
            return Math.min(0, newTranslateX);
        });
    };

    return (
        <div className="container mx-auto px-4 my-6">
            <h2 className="text-xl font-semibold py-2 my-6">{heading}</h2>

            <div className="relative overflow-hidden shadow-md p-4">
                <div className="absolute inset-y-0 left-0 flex items-center z-10">
                    <button className="bg-white rounded-full p-1" onClick={scrollLeft} disabled={translateX === 0}>
                        <ChevronLeft style={{ fontSize: '42px' }} />
                    </button>
                </div>
                <div className="absolute inset-y-0 right-0 flex items-center z-10">
                    <button className="bg-white rounded-full p-1" onClick={scrollRight} disabled={Math.abs(translateX) >= scrollElement.current?.scrollWidth - scrollElement.current?.clientWidth}>
                        <ChevronRight style={{ fontSize: '42px' }} />
                    </button>
                </div>

                <div
                    className="flex gap-4 transition-transform duration-300"
                    style={{ transform: `translateX(${translateX}px)` }}
                    ref={scrollElement}
                >
                    {data.map((product, index) => (
                        <div key={index} className="h-108 border-t-2 p-4 shadow-md bg-white min-w-[200px] sm:min-w-[250px] lg:min-w-[300px]">
                            <Link to={product?._id ? `/productDetails/${product._id}` : '/'} className="p-2 h-full flex flex-col">
                                <div className="w-4/6 md:w-full h-36 md:h-56 flex justify-center">
                                    <img src={product.productImage?.[0] || 'fallback-image-url.jpg'} alt={product.name || 'No image available'} className="w-full h-full object-cover" />
                                </div>
                                <div className="flex flex-col justify-center items-center">
                                    <div className="p-2 text-center">
                                        <p className="font-semibold p-1 w-40 h-8 md:w-80 overflow-hidden whitespace-nowrap text-ellipsis">{product?.productName}</p>
                                        <p className="capitalize">{product?.category}</p>
                                        <div className="flex gap-2 items-center justify-center">
                                            <p className="font-semibold text-red-500"><DisplayCurrency num={product?.sellingPrice} /></p>
                                            <p className="text-gray-400 line-through text-sm"><DisplayCurrency num={product?.price} /></p>
                                        </div>
                                    </div>
                                    <div className="p-2 flex justify-center">
                                        <button className="bg-red-500 text-white py-1 px-3 mt-auto self-start rounded-full font-semibold" onClick={(e) => handleAddCart(e, product?._id)}>Add to Cart</button>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default VerticalCartProduct;
