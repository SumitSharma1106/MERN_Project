import React, { useEffect } from 'react';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { useSelector } from 'react-redux';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import Role from '../../Common/role';

const AdminPanel = () => {
  const user = useSelector((state) => state?.user?.user);
  const navigate = useNavigate()
  useEffect(()=>{
    if(user?.role !==Role.ADMIN){
      navigate('/')
    }
  },[user])
  return (
    <div className='min-h-[calc(100vh-120px)] md:flex hidden'>
      <aside className='bg-white min-h-full w-full max-w-80 shadow-md'>
        <div className='h-44 bg-gradient-to-r from-orange-700 via-white to-green-500 flex justify-center items-center shadow-xl flex-col gap-2'>
          <div className='text-5xl cursor-pointer relative flex justify-center'>
            {user?._id ? (
              user.profilePic ? (
                <img src={user.profilePic} className='w-24 h-24 rounded-full bg-white' alt={user.name} />
              ) : (
                <div className='w-24 h-24 rounded-full bg-gray-300 flex items-center justify-center'>
                  <AccountCircle style={{ fontSize: 34 }} />
                </div>
              )
            ) : (
              <div className='w-24 h-24 rounded-full bg-gray-300 flex items-center justify-center'>
                <AccountCircle style={{ fontSize: 34 }} />
              </div>
            )}
          </div>
          <p className='font-semibold font-mono text-xl'>{user?.name}</p>
          <p className='text-neutral-700'>({user?.role})</p>
        </div>
        <div>
          <nav className='grid gap-2 mt-4'>
            <Link to='/adminPanel/all-users' className='hover:bg-gray-200 text-base p-2'>
              All Users
            </Link>
            <Link to='/adminPanel/all-products' className='hover:bg-gray-200 text-base p-2'>
              All Product
            </Link>
          </nav>
        </div>
      </aside>
      <main className='flex-1 overflow-y-auto p-4 bg-white border-1 border-l-gray-100 shadow-lg shadow-black'>
        <Outlet/>
      </main>
    </div>
  );
};

export default AdminPanel;
