import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { removeFromPastes } from '../redux/pasteSlice';
import toast from 'react-hot-toast';
import { NavLink } from 'react-router-dom';
import ViewPaste from './ViewPaste';

const Paste = () => {
  const pastes = useSelector((state) => state.paste.pastes);
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();

  const filteredData = pastes.filter(
    (paste) => paste.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = function (pasteId) {
    dispatch(removeFromPastes(pasteId));
  }

  const handleShare = (paste) => {
    if (navigator.share) {
      navigator
        .share({
          title: paste.title,
          text: paste.content,
          url: window.location.href, // Optional: current page URL
        })
        .then(() => toast.success("Shared successfully!"))
        .catch((error) => toast.error("Failed to share!"));
    } else {
      toast.error("Sharing not supported on this browser!");
    }
  };

  return (
    <div>

      <input
        className="p-2 border-2 border-indigo-200 border-b-indigo-500 rounded-xl mt-2 min-w-full"
        type="search"
        placeholder='Search'
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div>
        {
          filteredData.length > 0 &&
          filteredData.map(
            (paste) => {
              return (
                <div className='border m-2' key={paste?._id} >
                  <div >
                    {paste.title}
                  </div>
                  <div>
                    {paste.content}
                  </div>
                  <div
                    className='flex flex-row gap-4 place-content-evenly'
                  >
                    <button >
                      <NavLink
                        to={`/?pasteId=${paste?._id}`}
                      >Edit</NavLink>
                    </button>

                    <button className='text-inherit'>
                      <NavLink
                        to={`/pastes/${paste._id}`} // Correct way of using dynamic route
                      >
                        View
                      </NavLink>
                    </button>

                    <button onClick={() => handleDelete(paste?._id)}>
                      Delete
                    </button>

                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(paste?.content)
                        toast.success("copied")
                      }}
                    >
                      copy
                    </button>

                    <button onClick={handleShare} >
                      Share
                    </button>

                    <div>
                      {paste.createdAt}
                    </div>
                  </div>
                </div>
              )
            }
          )
        }
      </div>


    </div>
  )
}

export default Paste