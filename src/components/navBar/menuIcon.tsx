"use client";

import React from "react";

interface MenuIconProps {
  toggle: boolean;
  handleClick: () => void;
}

const MenuIcon: React.FC<MenuIconProps> = ({ toggle, handleClick }) => {
  return (
    <button
      onClick={handleClick}
      aria-label="Toggle menu"
      className="lg:hidden bg-transparent border-none cursor-pointer p-2 rounded-sm hover:bg-color-category-button"
    >
      <div className="w-5 h-4 relative flex flex-col justify-between">
        <span
          className={`block w-full h-0.5 bg-color-text rounded transition-all duration-300 ease-in-out transform origin-center ${
            toggle ? "translate-y-[7px] rotate-45" : ""
          }`}
        ></span>
        <span
          className={`block w-full h-0.5 bg-color-text rounded transition-all duration-300 ease-in-out ${
            toggle ? "opacity-0" : ""
          }`}
        ></span>
        <span
          className={`block w-full h-0.5 bg-color-text rounded transition-all duration-300 ease-in-out transform origin-center ${
            toggle ? "-translate-y-[7px] -rotate-45" : ""
          }`}
        ></span>
      </div>
    </button>
  );
};

export default MenuIcon;
