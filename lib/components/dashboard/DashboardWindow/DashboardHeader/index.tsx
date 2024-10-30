// lib/components/dashboard/DashboardHeader/index.tsx
import React from 'react';
import { CreateFolderIcon, DashboardIcon, FilterSearchIcon, LogoIcon, SidebarToggleIcon, TakeNoteIcon } from '../../svg';
import { SidebarTrigger } from '@/components/ui/sidebar';


// Define the prop type for DashboardHeader


const DashboardHeader = () => {
    return (
        <div className="flex justify-center items-center w-full py-4">
            <header className="inline-flex p-2 bg-neutral-800 rounded-lg">
                <div className="flex justify-start items-center gap-4">
                    {/* Logo Button */}
                    <LogoIcon theme="dark" width="16" height="16" /> 

                    {/* Dashboard Button */}
                    <div className="p-1 header-nav-icon rounded-lg flex justify-center items-center">
                        <DashboardIcon width="24" height="24"  /> {/* Dashboard size 24x24 */}
                    </div>

                    {/* Create Note Button */}
                    <div className="p-1 header-nav-icon rounded-lg flex justify-start items-center">
                        <TakeNoteIcon width="24" height="24"  /> {/* Create Note size 24x24 */}
                    </div>

                    {/* Create Folder Button */}
                    <div className="p-1 header-nav-icon rounded-lg flex justify-start items-center">
                        <CreateFolderIcon width="24" height="24"  /> {/* Create Folder size 24x24 */}
                    </div>

                    {/* Search Filter Button */}
                    <div className="p-1 header-nav-icon rounded-lg flex justify-center items-center">
                        <FilterSearchIcon width="24" height="24"  /> {/* Search Filter size 24x24 */}
                    </div>

                    {/* Sidebar Toggler Button */}
                    <SidebarTrigger className="p-1 header-nav-icon rounded-lg flex justify-center items-center">
                        <SidebarToggleIcon width="28" height="24" />
                    </SidebarTrigger>
                </div>
            </header>
        </div>

    );
};

export default DashboardHeader;
