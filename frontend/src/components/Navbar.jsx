import React from 'react';
import { Bell, Settings } from 'lucide-react';

function Navbar() {
  return (
    <div className="flex justify-end items-center p-4  gap-5 border-b bg-white">
    
        <Settings className="text-gray-500 hover:text-black" />
        <Bell className="text-gray-500 hover:text-black" />
        <img
          src="https://i.pravatar.cc/40"
          alt="Profile"
          className="rounded-full w-10 h-10 object-cover"
        />
      </div>
    
  );
}

export default Navbar;
