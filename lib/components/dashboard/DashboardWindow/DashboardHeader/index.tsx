// lib/components/dashboard/DashboardHeader/index.tsx
import React from 'react';

const DashboardHeader = () => {
    return (
        <header className="p-4 bg-blue-600 text-white">
            <h1 className="text-xl font-bold">Dashboard Header</h1>
            <nav>
                <ul className="flex space-x-4">
                    <li><a href="#" className="hover:underline">Home</a></li>
                    <li><a href="#" className="hover:underline">Profile</a></li>
                    <li><a href="#" className="hover:underline">Settings</a></li>
                </ul>
            </nav>
        </header>
    );
};

export default DashboardHeader;
