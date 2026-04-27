import React from 'react';
import Sidebar from './Sidebar';

function Layout({ children }) {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="content flex-grow p-6 bg-background overflow-y-auto">
        {children}
      </div>
    </div>
  );
}

export default Layout;
