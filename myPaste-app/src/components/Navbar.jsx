import React from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';

const Navbar = () => {
  return (
    <motion.nav
      className="bg-gradient-to-r from-indigo-600 to-purple-600 shadow-xl font-[Mulish,sans-serif]"
      initial={{ y: -60 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center text-white">
        <NavLink
          to="/"
          className="text-2xl font-bold tracking-wide hover:text-indigo-200 transition-all duration-200"
        >
          BrightPath
        </NavLink>

        <div className="flex gap-2 md:gap-4 items-center">
          {["/", "/pastes"].map((path, idx) => {
            const label = path === "/" ? "Home" : "Pastes";
            return (
              <NavLink
                key={idx}
                to={path}
                className={({ isActive }) =>
                  `px-4 py-2 rounded-lg text-base font-medium transition duration-300 ${
                    isActive
                      ? "bg-white text-indigo-700"
                      : "hover:bg-white hover:text-indigo-700"
                  }`
                }
              >
                {label}
              </NavLink>
            );
          })}
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
