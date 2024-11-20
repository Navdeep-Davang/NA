// lib/components/dashboard/DashboardWindow/index.tsx


"use client";
import React from 'react';
import DashboardHeader from './DashboardHeader';
import DashboardBody from './DashboardBody';


// Define the prop type for DashboardWindow

const DashboardWindow= () => {
    return (
        <div className="theme-dashboard-window flex-1 min-h-screen pl-12 pr-12 overflow-y-auto overflow-x-auto custom-scrollbar flex flex-col">
            <DashboardHeader />
            <DashboardBody />
        </div>
    );
};

export default DashboardWindow;
