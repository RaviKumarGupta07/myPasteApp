import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <div className="flex justify-between items-center p-4 bg-indigo-600 text-white shadow-lg">
      <div className="text-xl font-semibold">
        <NavLink to={"/"} className="hover:text-indigo-200 transition duration-200">Home</NavLink>
      </div>
      <div className="flex gap-6">
        <NavLink
          to={"/pastes"}
          className="px-4 py-2 rounded-lg hover:bg-indigo-500 hover:text-white transition duration-200"
        >
          Pastes
        </NavLink>
        {/* Add other nav links here as needed */}
      </div>
    </div>
  );
};

export default Navbar;
