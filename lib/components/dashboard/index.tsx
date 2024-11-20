// lib/components/dashboard/index.tsx

"use client";

import React, {  useEffect, useRef, useState } from "react";
import { SidebarProvider, Sidebar } from "@/components/ui/sidebar"; // Import Sidebar and SidebarTrigger
import UpperPart from "@/lib/components/dashboard/Sidebar/UpperPart";
import BottomPart from "@/lib/components/dashboard/Sidebar/BottomPart";
import { mydata } from "@/lib/storage/data/dashboard/Sidebar/db";
import DashboardWindow from "./DashboardWindow"; // Your main content area
import SettingsPanel from "./SettingsPanel";
import { useAppStore } from "@/lib/storage/state/useAppStore";

const MIN_SIDEBAR_WIDTH = 200; // Set your minimum sidebar width
const MAX_SIDEBAR_WIDTH = 300; // Set your maximum sidebar width

const Dashboard = () => {
  const sidebarRef = useRef<HTMLDivElement>(null);
  const [isResizing, setIsResizing] = useState(false); // Add this line
  const [isMobileDevice, setIsMobileDevice] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [sidebarWidth, setSidebarWidth] = useState('var(--sidebar-width, 250px)');
  const { isSettingsOpen } = useAppStore(); 

  

  useEffect(() => {
    if (isMobileDevice) {
      setSidebarWidth('0px'); // Initial width for mobile devices
    } else {
      setSidebarWidth('var(--sidebar-width, 250px)'); // Initial default width
    }
  }, []); // Empty dependency array ensures this runs only on mount

  useEffect(() => {
    if (isMobileDevice) {
      setSidebarWidth('0px'); // Hide the sidebar
    } else if (isSidebarCollapsed) {
      setSidebarWidth('0px'); // Set to zero if collapsed
    } else {
      setSidebarWidth('var(--sidebar-width, 250px)'); // Show the sidebar
    }
  }, [isMobileDevice, isSidebarCollapsed]);


  // Function to handle dragging
  const handleMouseMove = (e: MouseEvent) => {
    if (sidebarRef.current) {
      const newWidth = e.clientX - sidebarRef.current.getBoundingClientRect().left;
      if (newWidth >= MIN_SIDEBAR_WIDTH && newWidth <= MAX_SIDEBAR_WIDTH) {
        sidebarRef.current.style.setProperty('--sidebar-width', `${newWidth}px`);
      }
    }
  };

  // Function to start dragging
  const handleMouseDown = () => {
    setIsResizing(true); // Set isResizing to true when resizing starts
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", () => {
      setIsResizing(false); // Set isResizing to false when resizing ends
      document.removeEventListener("mousemove", handleMouseMove);
    }, { once: true }); // Remove the mousemove event after the mouse is released
  };

  return (
    <SidebarProvider setIsSidebarCollapsed={setIsSidebarCollapsed} setIsMobileDevice={setIsMobileDevice} >
      <div className="flex h-screen  w-full">
        {/* Sidebar with dynamic width */}
        <div
          ref={sidebarRef}
          className={`relative flex-shrink-0 ${
            isResizing ? 'transition-none' : 'transition-all duration-200 ease-in-out'
          }`}
          style={{ width: sidebarWidth }} // Use collapsed width when isCollapsed is true
        >
          <Sidebar 
            collapsible="offcanvas"
            isResizing={isResizing} // Pass the isResizing prop
            className={`${isResizing ? 'transition-none' : 'transition-all duration-200 ease-in-out'} no-user-select border-transparent`}
          >
            <div className="flex-grow">
              <UpperPart {...mydata} />
            </div>
            <BottomPart />
          </Sidebar>

          {/* Resizer element */}
          <div
            className="absolute right-0 top-0 h-full w-2 cursor-w-resize z-10"
            onMouseDown={handleMouseDown}
          ></div>
        </div>

        {/* Main content area */}
                
        <div className="flex-1 h-full">
          {isSettingsOpen && <SettingsPanel />}
          <DashboardWindow />
        </div>

      </div>
    </SidebarProvider>
  );
};

export default Dashboard;
