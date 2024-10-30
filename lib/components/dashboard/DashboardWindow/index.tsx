// lib/components/dashboard/DashboardWindow/index.tsx


"use client";
import React from 'react';
import DashboardHeader from './DashboardHeader';
import DashboardBody from './DashboardBody';


// Define the prop type for DashboardWindow

const DashboardWindow= () => {
    return (
        <div className="flex-1 min-h-screen overflow-y-auto overflow-x-auto bg-gray-100 custom-scrollbar flex flex-col">
            <DashboardHeader />
            <DashboardBody />
        </div>
    );
};

export default DashboardWindow;
