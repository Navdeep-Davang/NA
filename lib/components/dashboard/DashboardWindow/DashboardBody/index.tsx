// lib/components/dashboard/DashboardWindow/DashboardBody/index.tsx

import React from 'react';
import RecentElement from './RecentElement';
import CreateElement from './CreateElement';
import ListElementWindow from './ListElementWindow';

const DashboardBody = () => {
    return (
        <main className="p-4 flex flex-col gap-6 "> {/* Vertical stack with gap between containers */}
            {/* First Container: RecentElement */}
            <section>
                <RecentElement />
            </section>
            
            {/* Second Container: CreateElement */}
            <section>
                <CreateElement />
            </section>
            
            {/* Third Container: ListElementWindow */}
            <section>
                <ListElementWindow />
            </section>
        </main>
    );
};

export default DashboardBody;
