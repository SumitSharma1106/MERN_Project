import React, { useContext, useState } from 'react';
import LogIn_Text from '../../assets/InportantPhoto/LogIn_Text.png';
import Login_Photo from '../../assets/InportantPhoto/Login_Photo.png';
import { Button } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import SummaryApi from '../../Common';
import { toast } from 'react-toastify';
import Context from '../../context';

const LogIn = () => {
    const [visiblePassword, setVisiblePassword] = useState(false);
    const [data, setData] = useState({
        email: '',
        password: ''
    });

    const navigate = useNavigate()
    const {fetchUserDetails,fetchUserAddCart
    } = useContext(Context)


    const handleChange = (e) => {
        const { name, value } = e.target;
        setData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const dataResponse = await fetch(SummaryApi.signIn.url, {
                method: SummaryApi.signIn.method,
                credentials : "include",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify(data)
            });

            const dataApi = await dataResponse.json();

            if (dataApi.success) {
                toast.success(dataApi.message);
                navigate('/')
                fetchUserDetails()
                fetchUserAddCart()
            } else {
                toast.error(dataApi.message);
            }
        } catch (error) {
            console.error('Error logging in:', error);
            toast.error('Failed to log in. Please try again later.');
        }
    };

    return (
        <>
            <div id='login' className='mx-auto container p-4'>
                <div className='bg-white p-4 w-full max-w-md mx-auto'>
                    {/* Login Pictures */}
                    <div className='mb-4'>
                        <div className='flex justify-center'>
                            <img src={LogIn_Text} alt='Log In Text' />
                        </div>

                        <div className='flex justify-center'>
                            <img src={Login_Photo} alt='Login' className='w-32' />
                        </div>
                    </div>

                    {/* TextArea for Login */}
                    <form onSubmit={handleSubmit}>
                        <div className='font-semibold text-base'>
                            <label>Email:</label>
                            <div className='bg-slate-300 my-4'>
                                <input
                                    type='email'
                                    placeholder='Enter your Email...'
                                    name='email'
                                    value={data.email}
                                    onChange={handleChange}
                                    className='w-full border-1 p-1 border-black focus:outline-blue-500'
                                />
                            </div>
                        </div>
                        <div className='font-semibold text-base'>
                            <label>Password:</label>
                            <div className='bg-white my-4 flex'>
                                <input
                                    type={visiblePassword ? 'text' : 'password'}
                                    placeholder='Enter your Password...'
                                    name='password'
                                    value={data.password}
                                    onChange={handleChange}
                                    className='w-full border-none p-1 focus:outline-green-500'
                                />
                                <span className='cursor-pointer' onClick={() => setVisiblePassword((prev) => !prev)}>
                                    {visiblePassword ? <Visibility /> : <VisibilityOff />}
                                </span>
                            </div>
                        </div>

                        {/* Forgot Password */}
                        <div className='text-right text-sm text-gray-500 m-2'>
                            <Link to='/forgetPassword' className='hover:text-red-600 hover:underline'>
                                Forgot Password?
                            </Link>
                        </div>

                        {/* Button for login */}
                        <div className='flex justify-center m-2'>
                            <Button
                                type='submit'
                                variant='contained'
                                className='w-36'
                                style={{ borderRadius: '15%', padding: '12px', fontWeight: '800', backgroundColor: 'red' }}
                            >
                                Login
                            </Button>
                        </div>
                    </form>

                    {/* Sign Up route by login page */}
                    <p className='my-4'>
                        Don't have an account?{' '}
                        <Link to='/signUp' className='hover:underline text-red-600'>
                            Sign Up
                        </Link>
                    </p>
                </div>
            </div>
        </>
    );
};

export default LogIn;
