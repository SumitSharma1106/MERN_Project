import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { toast } from 'react-toastify';
import { Edit, Delete } from '@mui/icons-material';
import ChangeUserRole from '../ChangeUserRole';
import SummaryApi from '../../Common';

const AllUsers = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [openUpdateRole, setOpenUpdateRole] = useState(false);
  const [updateUserDetails, setUpdateUserDetails] = useState({
    email: "",
    name: "",
    role: "",
    _id: ""
  });
 
  const fetchAllUsers = async () => {
    try {
      const fetchData = await fetch(SummaryApi.allUser.url, {
        method: SummaryApi.allUser.method,
        credentials: "include"
      });

      if (!fetchData.ok) {
        throw new Error('Failed to fetch users');
      }

      const dataResponse = await fetchData.json();

      if (dataResponse.success) {
        setAllUsers(dataResponse.data);
      } else {
        toast.error(dataResponse.message);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
      toast.error('Failed to fetch users');
    }
  };

  useEffect(() => {
    fetchAllUsers();
  }, []);

  return (
    <>
      <table className='w-full pb-4 border-separate'>
        <thead className='bg-black text-white'>
          <tr>
            <th className='border-b-2 border-t-2 border-black font-extrabold'>Sr</th>
            <th className='border-b-2 border-t-2 border-black font-extrabold'>Name</th>
            <th className='border-b-2 border-t-2 border-black font-extrabold'>Email</th>
            <th className='border-b-2 border-t-2 border-black font-extrabold'>Role</th>
            <th className='border-b-2 border-t-2 border-black font-extrabold'>Created Date</th>
            <th className='border-b-2 border-t-2 border-black font-extrabold'>Action</th>
          </tr>
        </thead>
        <tbody>
          {allUsers.map((user, index) => (
            <tr key={user._id} className='mb-2 mt-2'>
              <td className='text-center border border-black'>{index + 1}</td>
              <td className='text-center border border-black'>{user?.name}</td>
              <td className='text-center border border-black'>{user?.email}</td>
              <td className='text-center border border-black'>{user?.role}</td>
              <td className='text-center border border-black'>{moment(user?.createdAt).format("ll")}</td>
              <td className='text-center border border-black'>
                <div className='flex justify-evenly gap-3'>
                  <Edit
                    className='hover:text-blue-800 hover:text-3xl m-2 cursor-pointer'
                    onClick={() =>{ 
                      setUpdateUserDetails(user)
                      setOpenUpdateRole(true)
                    }}
                  />
                  <Delete
                    className='hover:text-red-600 hover:text-3xl m-2 cursor-pointer'
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {openUpdateRole && (
        <ChangeUserRole
          onClose={() => setOpenUpdateRole(false)}
          name={updateUserDetails.name}
          email={updateUserDetails.email}
          role={updateUserDetails.role}
          userId={updateUserDetails._id}
          callFunc={fetchAllUsers}
        />
      )}
    </>
  );
};

export default AllUsers;
