import React, { useState, useRef, useEffect, useContext } from 'react';
import logo from '../../assets/logo.ico';
import { AccountCircle, Search, ShoppingCart } from '@mui/icons-material';
import { Button } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import SummaryApi from '../../Common';
import { toast } from 'react-toastify';
import { red } from '@mui/material/colors';
import { setUserDetails } from '../../store/userSlice';
import Role from '../../Common/role';
import Context from '../../context';

const Navbar = () => {
  const user = useSelector((state) => state?.user?.user);
  const dispatch = useDispatch();
  const [userInfoDisplay, setUserInfoDisplay] = useState(false);
  const userInfoRef = useRef(null);
  const context = useContext(Context);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await fetch(SummaryApi.logout_user.url, {
        method: SummaryApi.logout_user.method,
        credentials: 'include',
      });
      const data = await response.json();
      if (data.success) {
        toast.success(data.message);
        dispatch(setUserDetails(null));
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error('An error occurred. Please try again.');
    }
  };

  const toggleUserInfoDisplay = () => {
    setUserInfoDisplay((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userInfoRef.current && !userInfoRef.current.contains(event.target)) {
        setUserInfoDisplay(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [userInfoRef]);

  const handleSearch = (e) => {
    const { value } = e.target;
    if (value) {
      navigate(`/search?q=${value}`);
    } 
    if(!value){
      navigate("/")
    }
  };

  return (
    <ul className='flex justify-between h-16 shadow-2xl border-b-2 border-gray-500 items-center w-full bg-white'>
      <li>
        <Link to='/'>
          <img src={logo} alt='Logo' width={120} height={80} />
        </Link>
      </li>
      <li>
        <div className='hidden lg:flex items-center'>
          <div className='border-gray-500 border-solid border-2 rounded-xl overflow-hidden flex items-center h-10 w-full max-w-md'>
            <input
              type='text'
              placeholder='Enter your product name...'
              className='flex-grow p-1 outline-none lg:min-w-80'
              onChange={handleSearch}
            />
            <button className='p-2 bg-red-500 text-white'>
              <Search />
            </button>
          </div>
        </div>
      </li>
      <li className='flex gap-8 mr-6 items-center'>
        <div className='relative group flex justify-center' ref={userInfoRef}>
          <div
            className='text-3xl cursor-pointer relative'
            onClick={toggleUserInfoDisplay}
            aria-expanded={userInfoDisplay}
            aria-haspopup='true'
          >
            {user?._id ? (
              user.profilePic ? (
                <img src={user.profilePic} className='w-10 h-10 rounded-full' alt={user.name} />
              ) : (
                <AccountCircle style={{ fontSize: 34 }} />
              )
            ) : (
              ""
            )}
          </div>
          {userInfoDisplay && (
            <div className='absolute bg-white z-50 bottom-0 top-12 h-fit p-4 shadow-sm rounded block' role='menu'>
              {user?.role === Role.ADMIN && (
                <Link to='/adminPanel/all-users' className='whitespace-nowrap hidden md:block hover:bg-slate-100 p-2' role='menuitem'>
                  Admin Panel
                </Link>
              )}
            </div>
          )}
        </div>
        {user?._id && (
          <Link to='/cart' className='relative inline-block'>
            <ShoppingCart style={{ fontSize: 34 }} className='text-black' />
            <span className='absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-red-500 text-white text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center'>
              {context.cartProductCount}
            </span>
          </Link>
        )}
        <div>
          {user?._id ? (
            <Button
              variant='contained'
              onClick={handleLogout}
              startIcon={<AccountCircle style={{ fontSize: 24 }} />}
              style={{ backgroundColor: red[500], color: 'white' }}
            >
              Logout
            </Button>
          ) : (
            <Link to='/login'>
              <Button variant='contained' startIcon={<AccountCircle style={{ fontSize: 24 }} />}>
                Log In
              </Button>
            </Link>
          )}
        </div>
      </li>
    </ul>
  );
};

export default Navbar;
