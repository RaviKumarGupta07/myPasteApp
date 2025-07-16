import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ViewPaste = () => {
  const { id } = useParams();
  const allPastes = useSelector((state) => state.paste.pastes);

  const paste = allPastes.find((p) => p._id === id);

  if (!paste) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600 text-lg font-[Mulish,sans-serif]">
        Paste not found!
      </div>
    );
  }

  return (
    <div className="min-h-screen px-4 py-10 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 flex justify-center items-start font-[Mulish,sans-serif]">
      <div className="w-full max-w-3xl bg-white/70 backdrop-blur-md p-8 rounded-2xl shadow-2xl border border-white/40">
        <h1 className="text-3xl font-bold text-indigo-700 mb-6 text-center">View Paste</h1>

        <label className="block mb-2 text-sm font-semibold text-gray-700">Title</label>
        <input
          type="text"
          value={paste.title}
          disabled
          className="w-full p-3 mb-6 bg-gray-100 border border-gray-300 rounded-lg text-gray-800"
        />

        <label className="block mb-2 text-sm font-semibold text-gray-700">Content</label>
        <textarea
          value={paste.content}
          disabled
          rows={15}
          className="w-full p-4 bg-gray-100 border border-gray-300 rounded-xl text-gray-800 resize-none"
        ></textarea>

        <div className="text-right text-xs text-gray-500 mt-4">
          Created at: {new Date(paste.createdAt).toLocaleString()}
        </div>
      </div>
    </div>
  );
};

export default ViewPaste;
