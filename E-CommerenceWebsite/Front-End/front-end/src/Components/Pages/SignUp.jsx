import React, { useState } from 'react';
import SignUp_Text from '../../assets/InportantPhoto/SignUp_Text.png';
import Login_Photo from '../../assets/InportantPhoto/Login_Photo.png';
import { Button } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import ImageHelper from '../ImagerHelper/ImageHelper';
import SummaryApi from '../../Common';
import { toast } from 'react-toastify';

const SignUp = () => {
    const [visiblePassword, setVisiblePassword] = useState(false);
    const [visibleConfirmPassword, setVisibleConfirmPassword] = useState(false);
    const [data, setData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        profilePic: '' // Ensure profilePic is part of the state
    });
    const navigate = useNavigate()
    const handleChange = (e) => {
        const { name, value } = e.target;
        setData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (data.password === data.confirmPassword) {
            try {
                const response = await fetch(SummaryApi.signUp.url, {
                    method: SummaryApi.signUp.method,
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(data)
                });
                const result = await response.json();

                if (result.success) {
                    toast.success(result.message);
                    navigate('/logIn');
                } else {
                    toast.error(result.message);
                }
            } catch (error) {
                toast.error("Something went wrong, please try again");
            }
        } else {
            toast.error("Password and Confirm Password must be the same");
        }
    };

    const handleUploadPict = async (e) => {
        const file = e.target.files[0];
        const ImagePic = await ImageHelper(file);
        setData((prev) => ({
            ...prev,
            profilePic: ImagePic
        }));
    };

    return (
        <div id='signUp' className='mx-auto container p-4'>
            <div className='bg-white p-4 w-full max-w-md mx-auto'>
                <div className='mb-4'>
                    <div className='flex justify-center'>
                        <img src={SignUp_Text} alt='SignUp Text' />
                    </div>
                    <div className='flex flex-col items-center'>
                        <div className='relative overflow-hidden rounded-full'>
                            <img src={data.profilePic || Login_Photo} alt='Login' className='w-32' />
                            <form>
                                <label htmlFor='file-upload' className='cursor-pointer'>
                                    <div className='text-xs py-4 text-center bg-slate-200 absolute bottom-0 w-full opacity-70 font-extrabold'>
                                        Upload Photo
                                    </div>
                                    <input type='file' id='file-upload' className='hidden' onChange={handleUploadPict} />
                                </label>
                            </form>
                        </div>
                    </div>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className='font-semibold text-base'>
                        <label htmlFor='name'>Name:</label>
                        <div className='bg-slate-300 my-4'>
                            <input
                                type='text'
                                id='name'
                                placeholder='Enter your Name...'
                                name='name'
                                value={data.name}
                                onChange={handleChange}
                                required
                                className='w-full border-1 p-1 border-black focus:outline-yellow-500'
                            />
                        </div>
                    </div>

                    <div className='font-semibold text-base'>
                        <label htmlFor='email'>Email:</label>
                        <div className='bg-slate-300 my-4'>
                            <input
                                type='email'
                                id='email'
                                placeholder='Enter your Email...'
                                name='email'
                                value={data.email}
                                required
                                onChange={handleChange}
                                className='w-full border-1 p-1 border-black focus:outline-blue-500'
                            />
                        </div>
                    </div>

                    <div className='font-semibold text-base'>
                        <label htmlFor='password'>Password:</label>
                        <div className='bg-white my-4 flex'>
                            <input
                                type={visiblePassword ? 'text' : 'password'}
                                id='password'
                                placeholder='Enter your Password...'
                                name='password'
                                value={data.password}
                                required
                                onChange={handleChange}
                                className='w-full border-none p-1 focus:outline-green-500'
                            />
                            <span className='cursor-pointer p-0 m-1' onClick={() => setVisiblePassword((prev) => !prev)}>
                                {visiblePassword ? <Visibility /> : <VisibilityOff />}
                            </span>
                        </div>
                    </div>

                    <div className='font-semibold text-base'>
                        <label htmlFor='confirmPassword'>Confirm Password:</label>
                        <div className='bg-white my-4 flex'>
                            <input
                                type={visibleConfirmPassword ? 'text' : 'password'}
                                id='confirmPassword'
                                placeholder='Confirm your Password...'
                                name='confirmPassword'
                                value={data.confirmPassword}
                                required
                                onChange={handleChange}
                                className='w-full border-none p-1 focus:outline-red-500'
                                autocomplete='new-password'
                            />

                            <span
                                className='cursor-pointer p-0 m-1'
                                onClick={() => setVisibleConfirmPassword((prev) => !prev)}>
                                {visibleConfirmPassword ? <Visibility /> : <VisibilityOff />}
                            </span>
                        </div>
                    </div>

                    <div className='flex justify-center m-2'>
                        <Button
                            type='submit'
                            variant='contained'
                            className='w-36'
                            style={{ borderRadius: '15%', padding: '12px', fontWeight: '800', backgroundColor: 'red' }}>
                            Sign Up
                        </Button>
                    </div>
                </form>

                <p className='my-4'>
                    Already have an account? <Link to='/logIn' className='hover:underline text-red-600'>
                        Log In
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default SignUp;
