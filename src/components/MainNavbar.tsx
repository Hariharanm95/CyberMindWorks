"use client";
import React from "react";

interface MainNavbarProps {
  onCreateJobClick: () => void;
}

export default function MainNavbar({ onCreateJobClick }: MainNavbarProps) {
  return (
    <nav className="fixed h-80px w-890px top-7 left-1/2 -translate-x-1/2 bg-white shadow-sm z-50 rounded-full border border-gray-200">
      <div className="flex items-center justify-between py-3 px-6 space-x-8">
        {/* Logo */}
        <div className="flex items-center text-sm space-x-2 cursor-pointer">
          <img
            src="/logo.svg"
            alt="Logo"
            className="h-8 w-8 rounded-full object-cover"
          />
        </div>

        {/* Links */}
        <ul className="flex items-center space-x-6 text-gray-800 text-xs">
          <li className="cursor-pointer hover:text-purple-600">Home</li>
          <li className="cursor-pointer hover:text-purple-600">Find Jobs</li>
          <li className="cursor-pointer hover:text-purple-600">Find Talents</li>
          <li className="cursor-pointer hover:text-purple-600">About Us</li>
          <li className="cursor-pointer hover:text-purple-600">Testimonials</li>
        </ul>

        {/* Create Jobs Button */}
          <button
            onClick={onCreateJobClick}
            className="text-white px-6 py-2 rounded-full text-xs shadow hover:opacity-90"
            style={{
              background: "linear-gradient(180deg, #A128FF 0%, #6100AD 113.79%)",
            }}
          >
            Create Jobs
          </button>
          </div>
    </nav>
  );
}
