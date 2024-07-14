import React, { useState } from 'react';
import Role from '../Common/role';
import SummaryApi from '../Common';
import { toast } from 'react-toastify';
import { Close } from '@mui/icons-material';
import { Button } from '@mui/material';

const ChangeUserRole = ({
  name,
  email,
  role,
  userId,
  onClose,
  callFunc,
}) => {
  const [userRole, setUserRole] = useState(role || ""); // Set default role to empty string if role is null

  const handleOnChangeSelect = (e) => {
    setUserRole(e.target.value);
  };

  const updateUserRole = async () => {
    try {
      const fetchResponse = await fetch(SummaryApi.updateUser.url, {
        method: SummaryApi.updateUser.method,
        credentials: 'include',
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify({
          userId: userId,
          role: userRole
        })
      });

      const responseData = await fetchResponse.json();

      if (responseData.success) {
        toast.success(responseData.message);
        onClose();
        callFunc();
      } else {
        toast.error(responseData.message || 'Failed to update role');
      }

      console.log("role updated", responseData);
    } catch (error) {
      console.error('Error updating role:', error);
      toast.error('Failed to update role');
    }
  };

  return (
    <div className='fixed top-0 bottom-0 left-0 right-0 w-full h-full z-10 flex justify-center items-center bg-slate-200 bg-opacity-50'>
      <div className='mx-auto bg-white shadow-md p-4 w-full max-w-sm'>
        <button className='block ml-auto' onClick={onClose}>
          <Close/>
        </button>

        <h1 className='pb-4 text-lg font-medium'>Change User Role</h1>

        <p>Name: {name}</p>
        <p>Email: {email}</p>

        <div className='flex items-center justify-between my-4'>
          <p>Role:</p>
          <select className='border px-4 py-1' value={userRole} onChange={handleOnChangeSelect}>
            {Object.values(Role).map(el => (
              <option value={el} key={el}>{el}</option>
            ))}
          </select>
        </div>
            <div className='flex justify-center mt-4 p-2 rounded-full'>
              <Button variant='contained' style={{backgroundColor:'red', fontWeight: '600', fontSize: '18', width:'100%'}} onClick={updateUserRole}>Change Role</Button>
            </div>
            
      </div>
    </div>
  );
};

export default ChangeUserRole;
