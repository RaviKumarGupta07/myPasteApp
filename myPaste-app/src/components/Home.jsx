import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToPastes, updateToPastes } from '../redux/pasteSlice';

const Home = () => {
  const [title, setTitle] = useState("");
  const [value, setValue] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const pasteId = searchParams.get("pasteId");

  const dispatch = useDispatch();
  const allPastes = useSelector((state) => state.paste.pastes);

  useEffect(() => {
    if (pasteId) {
      const paste = allPastes.find((p) => p._id === pasteId);
      if (paste) {
        setTitle(paste.title);
        setValue(paste.content);
      }
    }
  }, [pasteId, allPastes]);

  const createPaste = () => {
    const paste = {
      title,
      content: value,
      _id: pasteId || Date.now().toString(36),
      createdAt: new Date().toISOString(),
    };

    pasteId ? dispatch(updateToPastes(paste)) : dispatch(addToPastes(paste));
    setTitle("");
    setValue("");
    setSearchParams({});
  };

  return (
    <div className="min-h-screen px-4 py-10 bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 flex justify-center items-start font-[Mulish,sans-serif]">
      <div className="w-full max-w-3xl bg-white/60 backdrop-blur-md p-6 rounded-2xl shadow-2xl border border-white/40">
        <h1 className="text-3xl font-bold text-indigo-700 text-center mb-6">
          {pasteId ? "Edit Your Paste" : "Create a New Paste"}
        </h1>

        <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
          <input
            className="flex-1 p-3 border border-indigo-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 text-gray-800 text-lg font-medium"
            type="text"
            placeholder="Enter title here"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <button
            onClick={createPaste}
            type="button"
            className="min-w-[200px] h-14 rounded-lg bg-blue-600 text-white text-xl font-semibold tracking-wide text-center transition-all shadow-md hover:shadow-lg focus:ring-2 focus:ring-blue-400 active:bg-blue-700"
          >
            {pasteId ? "Update Paste" : "Create Paste"}
          </button>
        </div>

        <textarea
          className="w-full h-96 p-4 border border-gray-300 rounded-xl resize-none shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-800 text-base"
          value={value}
          placeholder="Enter content here"
          onChange={(e) => setValue(e.target.value)}
        ></textarea>
      </div>
    </div>
  );
};

export default Home;
