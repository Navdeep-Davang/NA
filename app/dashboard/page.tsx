// app/dashboard/page.tsx

import React, { Suspense } from 'react';
import Dashboard from '@/lib/components/dashboard'; // Adjust the path as needed
import DashboardLoading from './loading';


const DashboardPage = () => {
    return (
        <Suspense fallback={<DashboardLoading />}>
            <Dashboard />
        </Suspense>
    );

};

export default DashboardPage;
