import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './Components/Navbar/Navbar';
import Home from './Components/Pages/Home';
import SignUp from './Components/Pages/SignUp';
import LogIn from './Components/Pages/LogIn';
import ForgetPassword from './Components/Pages/ForgetPassword';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SummaryApi from './Common';
import Context from './context';
import { useDispatch } from 'react-redux';
import { setUserDetails } from './store/userSlice';
import AdminPanel from './Components/Pages/AdminPanel';
import AllUsers from './Components/Pages/AllUsers';
import AllProduct from './Components/Pages/AllProduct';
import CategoryProduct from './Components/Pages/CategoryProduct';
import ProductDetails from './Components/Pages/ProductDetails';
import Cart from './Components/Pages/Cart';
import SearchProduct from './Components/Pages/SearchProduct';
import PaymentSlip from './Components/Pages/PaymentSlip';

function App() {
    const dispatch = useDispatch();
    const [cartProductCount, setCartProductCount] = useState(0);

    const fetchUserDetails = async () => {
        const dataResponse = await fetch(SummaryApi.current_user.url, {
            method: SummaryApi.current_user.method,
            credentials: "include"
        });
        const dataApi = await dataResponse.json();

        if (dataApi.success) {
            dispatch(setUserDetails(dataApi.data));
        }
    };

    const fetchUserAddCart = async () => {
        const dataResponse = await fetch(SummaryApi.addToCartProductCount.url, {
            method: SummaryApi.addToCartProductCount.method,
            credentials: "include"
        });
        const dataApi = await dataResponse.json();

        setCartProductCount(dataApi?.data?.count || 0);
    };

    useEffect(() => {
        fetchUserDetails();
        fetchUserAddCart();
    }, []);

    return (
        <>
            <Context.Provider value={{ fetchUserDetails, cartProductCount, fetchUserAddCart }}>
                <ToastContainer />
                <BrowserRouter>
                    <Navbar />
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/signUp" element={<SignUp />} />
                        <Route path="/logIn" element={<LogIn />} />
                        <Route path="/forgetPassword" element={<ForgetPassword />} />
                        <Route path="/adminPanel" element={<AdminPanel />}>
                            <Route path="all-users" element={<AllUsers />} />
                            <Route path="all-products" element={<AllProduct />} />
                        </Route>
                        <Route path="/categoryProduct/:categoryName" element={<CategoryProduct />} />
                        <Route path="/productDetails/:id" element={<ProductDetails />} />
                        <Route path="/cart" element={<Cart />} />
                        <Route path="/search" element={<SearchProduct />} />
                        <Route path="/payment" element = {<PaymentSlip/>}/>
                        
                    </Routes>
                </BrowserRouter>
            </Context.Provider>
        </>
    );
}

export default App;
