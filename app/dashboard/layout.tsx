// app\dashboard\layout.tsx

import React from 'react';
import "@/lib/styles/dashboard/Dashboard.css"; // Import the globals.css


const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="no-user-select">
      {children}
    </div>
  );
};

export default Layout;
