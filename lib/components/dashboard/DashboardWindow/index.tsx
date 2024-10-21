// lib/components/dashboard/DashboardWindow/index.tsx


"use client";
import React from 'react';
import DashboardHeader from './DashboardHeader';
import DashboardBody from './DashboardBody';


const DashboardWindow = () => {
    return (
        <div className="flex-1 bg-gray-100">
            <DashboardHeader />
            <DashboardBody />
        </div>
    );
};

export default DashboardWindow;
