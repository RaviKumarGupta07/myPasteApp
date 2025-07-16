import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { addToPastes, updateToPastes } from '../redux/pasteSlice';
import { useSelector } from 'react-redux';

const Home = () => {
    const [title, setTitle] = useState("");
    const [value, setValue] = useState("");
    const [searchParams, setSearchParams] = useSearchParams();
    const pasteId = searchParams.get("pasteId");
    const dispatch = useDispatch();
    const allPastes=useSelector((state)=>state.paste.pastes);

    useEffect(() => {
        if (pasteId) {
            const paste = allPastes.find((p) => p._id === pasteId);
            if (paste) {
                setTitle(paste.title);
                setValue(paste.content); // Correctly use paste.content, not paste.value
            }
        }
    }, [pasteId, allPastes]);
    const createPaste = function () {
        const paste = {
            title: title,
            content: value,
            _id: pasteId || Date.now().toString(36),
            createdAt: new Date().toISOString(),
        };
        if (pasteId) {
            // Update paste
            dispatch(updateToPastes(paste));
        } else {
            // Create paste
            dispatch(addToPastes(paste));
        }

        // Clear inputs and reset URL
        setTitle("");
        setValue("");
        setSearchParams({}); // Clear query parameters
    };

    return (
        <div className="flex flex-col items-center p-4">
            <div className="flex flex-row items-center gap-4 place-content-center">
                <input
                    className="p-2 border-2 border-indigo-200 border-b-indigo-500 rounded-xl mt-2 w-80"
                    type="text"
                    placeholder="Enter title here"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <button
                    onClick={createPaste}
                    className="bg-indigo-500 text-white py-2 px-4 rounded-xl hover:bg-indigo-600 transition">
                    {pasteId ? "Update My Paste" : "Create My Paste"}
                </button>
            </div>
            <div className="mt-4 w-full max-w-4xl">
                <textarea
                    className="mt-4 w-full p-4 rounded-2xl border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    value={value}
                    placeholder="Enter content here"
                    onChange={(e) => setValue(e.target.value)}
                    rows={20}
                ></textarea>
            </div>
        </div>
    );
};

export default Home;
