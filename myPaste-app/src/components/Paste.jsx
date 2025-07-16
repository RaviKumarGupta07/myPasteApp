import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromPastes } from '../redux/pasteSlice';
import toast from 'react-hot-toast';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';

const Paste = () => {
  const pastes = useSelector((state) => state.paste.pastes);
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();

  const filteredData = pastes.filter((paste) =>
    paste.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (pasteId) => {
    dispatch(removeFromPastes(pasteId));
    toast.success("Deleted successfully!");
  };

  const handleShare = (paste) => {
    if (navigator.share) {
      navigator
        .share({
          title: paste.title,
          text: paste.content,
          url: window.location.href,
        })
        .then(() => toast.success("Shared successfully!"))
        .catch(() => toast.error("Share failed!"));
    } else {
      toast.error("Sharing not supported on this browser!");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 p-6 font-[Mulish,sans-serif]">
      <input
        type="search"
        placeholder="Search pastes..."
        className="w-full p-3 rounded-lg border-2 border-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-6 text-gray-800 placeholder-gray-500"
        style={{ fontFamily: "Mulish, sans-serif", fontSize: "16px" }}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />


      <div className="grid gap-6">
        {filteredData.map((paste) => (
          <motion.div
            key={paste._id}
            className="bg-white rounded-2xl shadow-lg p-6 border border-white/70 backdrop-blur-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="text-xl font-bold text-indigo-700 mb-2">{paste.title}</div>
            <div className="text-gray-700 text-sm whitespace-pre-line mb-4">
              {paste.content.length > 200 ? paste.content.slice(0, 200) + "..." : paste.content}
            </div>

            <div className="flex flex-wrap items-center gap-3 text-sm font-medium">
              <NavLink to={`/?pasteId=${paste._id}`} className="text-indigo-600 hover:underline">Edit</NavLink>
              <NavLink to={`/pastes/${paste._id}`} className="text-blue-600 hover:underline">View</NavLink>
              <button onClick={() => handleDelete(paste._id)} className="text-red-600 hover:underline">Delete</button>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(paste.content);
                  toast.success("Copied to clipboard!");
                }}
                className="text-green-600 hover:underline"
              >
                Copy
              </button>
              <button onClick={() => handleShare(paste)} className="text-purple-600 hover:underline">Share</button>

              <div className="text-gray-400 text-xs ml-auto">
                {new Date(paste.createdAt).toLocaleString()}
              </div>
            </div>
          </motion.div>
        ))}

        {filteredData.length === 0 && (
          <div className="text-center text-gray-500 text-sm">No pastes found.</div>
        )}
      </div>
    </div>
  );
};

export default Paste;
