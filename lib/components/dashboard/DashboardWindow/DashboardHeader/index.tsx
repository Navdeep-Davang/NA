// lib/components/dashboard/DashboardHeader/index.tsx
import React from 'react';
import { CreateFolderIcon, DashboardIcon, FilterSearchIcon, LogoIcon, SidebarToggleIcon, TakeNoteIcon } from '../../svg';
import { SidebarTrigger, useSidebar } from '@/components/ui/sidebar';
import { motion } from "framer-motion";
import { useTheme } from 'next-themes';
import { CirclePlus, History, Moon, Sun } from 'lucide-react';


// Define the prop type for DashboardHeader


const DashboardHeader = () => {
    const { state } = useSidebar(); 
    const { theme, setTheme } = useTheme();

    return ( 
        <div className=" inline-flex sticky top-0 z-10 w-full justify-center">
             <motion.header
                className="p-2 m-4 rounded-lg backdrop-blur-md bg-opacity-70 border theme-header-background theme-header-border"
                initial={{ width: "auto" }}
                animate={{
                width: state === "collapsed" ? "auto" : "auto", // Adjust header width based on state
                }}
                transition={{ duration: 0.2 }}
            >
                <div className="flex justify-start items-center gap-4">
                
                {/* Logo Button */}
                <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{
                    opacity: state === "collapsed" ? 1 : 0,
                    scale: state === "collapsed" ? 1 : 0,
                    }}
                    transition={{ duration: 0.2 }}
                    className={state === "collapsed" ? "inline-flex" : "hidden"} // Keeps layout space dynamic
                >
                    <LogoIcon theme="dark" width="16" height="16" />
                </motion.div>

                {/* Dashboard Button */}
                <div className="p-1 header-nav-icon rounded-lg flex justify-center items-center">
                    <DashboardIcon width="24" height="24" />
                </div>

                {/* Other icons */}
                
                <div className="p-1 header-nav-icon rounded-lg  flex justify-start items-center">
                    <History width="24" height="24" />
                </div>

                <div className="p-1 header-nav-icon rounded-lg flex justify-start items-center">
                    <CirclePlus width="24" height="24" />
                </div>

                <div className="p-1 header-nav-icon rounded-lg flex justify-center items-center">
                    <FilterSearchIcon width="24" height="24" />
                </div>

                <div 
                    className="p-1 header-nav-icon rounded-lg flex justify-center items-center cursor-pointer relative"
                    onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                    role="button"
                    aria-label="Toggle theme"
                >
                    <Sun width="24" height="24" className=" rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                    <Moon width="24" height="24" className="absolute  rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                </div>


                {/* Sidebar Toggler Button */}
                <SidebarTrigger className="p-1 header-nav-icon rounded-lg flex justify-center items-center">
                    <SidebarToggleIcon width="28" height="24" />
                </SidebarTrigger>
                </div>
            </motion.header>
        </div>  
       


    );
};

export default DashboardHeader;
