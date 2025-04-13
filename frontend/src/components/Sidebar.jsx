// Sidebar.jsx
import React from 'react';
import { User, CalendarDays, MessageCircle, LayoutDashboard } from 'lucide-react';
import { NavLink } from 'react-router-dom';

function Sidebar() {
  const navItemStyle = ({ isActive }) =>
    `flex items-center px-6 py-3 text-sm font-medium ${
      isActive ? 'bg-blue-600 text-white rounded-l-full' : 'text-gray-500 hover:text-black'
    }`;

  return (
    <aside className="w-64 bg-white border-r h-screen">
      <div className="text-2xl font-bold text-blue-600 p-6">RS-TECH</div>
      <nav className="mt-6">
        <ul className="space-y-2">
          <li>
            <NavLink to="/employee" className='text-gray-500 hover:text-black flex items-center px-6 py-3 text-sm font-medium '>
              <LayoutDashboard className="w-5 h-5 mr-3" /> Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink to="/employee" className={navItemStyle}>
              <User className="w-5 h-5 mr-3" /> Employee
            </NavLink>
          </li>
          <li>
            <NavLink to="/employee" className='text-gray-500 hover:text-black flex items-center px-6 py-3 text-sm font-medium '>
              <CalendarDays className="w-5 h-5 mr-3" /> Calendar
            </NavLink>
          </li>
          <li>
            <NavLink to="/employee" className='text-gray-500 hover:text-black flex items-center px-6 py-3 text-sm font-medium '>
              <MessageCircle className="w-5 h-5 mr-3" /> Messages
            </NavLink>
          </li>
        </ul>
      </nav>
    </aside>
  );
}

export default Sidebar;