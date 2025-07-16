import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ViewPaste = () => {
  const { id } = useParams(); // useParams ko correctly use karte hain
  const allPastes = useSelector((state) => state.paste.pastes);
  
  // Find the paste matching the id
  const paste = allPastes.find((p) => p._id === id);
  console.log(paste);

  if (!paste) {
    return <div>Paste not found!</div>; // Agar paste nahi milta, to user ko message dikha do
  }

  return (
    <div>
      <div className="flex flex-col items-center p-4">
        <div className="flex flex-row items-center gap-4 place-content-center">
          <input
            className="p-2 border-2 border-indigo-200 border-b-indigo-500 rounded-xl mt-2 w-80"
            type="text"
            placeholder="Enter title here"
            value={paste.title} // paste.title use karna
            disabled
          />
        </div>

        <div className="mt-4 w-full max-w-4xl">
          <textarea
            className="mt-4 w-full p-4 rounded-2xl border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={paste.content} // paste.content use karna
            placeholder="Enter content here"
            disabled
            rows={20}
          ></textarea>
        </div>
      </div>
    </div>
  );
};

export default ViewPaste;
