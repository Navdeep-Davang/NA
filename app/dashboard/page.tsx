// app/dashboard/page.tsx

import React, { Suspense } from 'react';
import Dashboard from '@/lib/components/dashboard'; // Adjust the path as needed
import { DashboardSkeleton } from '@/lib/components/dashboard/Skeleton';


const DashboardPage = () => {
    return (
        <Suspense fallback={<DashboardSkeleton />}>
            <Dashboard />
        </Suspense>
    );

};

export default DashboardPage;
