import { Close } from '@mui/icons-material';
import React from 'react';

const DisplayImage = ({ imgUrl, onClose }) => {
  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 bg-gray-900 bg-opacity-75 flex justify-center items-center z-50">
      <div className="max-w-2xl max-h-2xl relative">
        <div className="absolute top-0 right-0 p-4">
          <Close className="text-black font-bold cursor-pointer" onClick={onClose} />
        </div>
        <img src={imgUrl} alt="Full Screen Image" className="w-full h-auto" />
      </div>
    </div>
  );
};

export default DisplayImage;
