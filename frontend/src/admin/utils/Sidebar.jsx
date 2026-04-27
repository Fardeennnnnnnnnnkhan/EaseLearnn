import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaHome, FaBook, FaUsers, FaSignOutAlt } from 'react-icons/fa';

function Sidebar() {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  const links = [
    { name: 'Home', path: '/admin/dashboard', icon: <FaHome /> },
    { name: 'Courses', path: '/admin/course', icon: <FaBook /> },
    { name: 'Users', path: '/admin/users', icon: <FaUsers /> },
    { name: 'Logout', path: '/Account', icon: <FaSignOutAlt /> },
  ];

  return (
    <div className='h-full w-20 md:w-64 bg-card border-r border-border py-28 flex flex-col items-center md:items-stretch transition-all'>
      <ul className='w-full space-y-2 px-2'>
        {links.map((link) => (
          <li key={link.name}>
            <Link 
              to={link.path} 
              className={`flex items-center justify-center md:justify-start px-4 py-3 rounded-xl transition-all ${
                isActive(link.path) 
                  ? 'bg-primary text-primary-foreground shadow-md' 
                  : 'hover:bg-muted text-muted-foreground hover:text-foreground'
              }`}
            >
              <div className={`text-xl ${isActive(link.path) ? 'text-primary-foreground' : 'text-primary'}`}>
                {link.icon}
              </div>
              <span className='hidden md:inline-block ml-4 font-light'>{link.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Sidebar;
