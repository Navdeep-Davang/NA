// lib/components/dashboard/index.tsx

"use client";

import React, { useRef, useState } from "react";
import { SidebarProvider, Sidebar, SidebarTrigger } from "@/components/ui/sidebar"; // Import Sidebar and SidebarTrigger
import UpperPart from "@/lib/components/dashboard/Sidebar/UpperPart";
import BottomPart from "@/lib/components/dashboard/Sidebar/BottomPart";
import { mydata } from "@/lib/database/dashboard/Sidebar/db";
import DashboardWindow from "./DashboardWindow"; // Your main content area

const MIN_SIDEBAR_WIDTH = 200; // Set your minimum sidebar width
const MAX_SIDEBAR_WIDTH = 300; // Set your maximum sidebar width

const Dashboard = () => {
  const sidebarRef = useRef<HTMLDivElement>(null);
  const [toggleTriggered, setToggleTriggered] = useState(false);
  const [isResizing, setIsResizing] = useState(false); // Add this line
  const [isCollapsed, setIsCollapsed] = useState(false);


  const handleSidebarToggle = () => {
    setToggleTriggered(true); // Set toggle triggered state to true
    setIsCollapsed(prev => !prev);
  };

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
    <SidebarProvider>
      <div className="flex h-screen w-full">
        {/* Sidebar with dynamic width */}
        <div
          ref={sidebarRef}
          className={`relative flex-shrink-0 ${!isResizing && toggleTriggered ? 'transition-all duration-200 ease-in-out' : ''}`} 
          style={{ width: isCollapsed ? '0px' : 'var(--sidebar-width, 250px)' }} // Use collapsed width when isCollapsed is true
        >
          <Sidebar 
            collapsible="offcanvas"
            isResizing={isResizing} // Pass the isResizing prop
            className={`${!isResizing && toggleTriggered ? 'transition-all duration-200 ease-in-out transition-class' : ''}`} 
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
        
        <div className="flex-grow flex flex-col w-full">
          <div className="flex flex-grow">
            {/* This div should not have flex-grow since it's already in a flex container */}
            <div className="flex flex-col w-full">
              <SidebarTrigger className="p-2 bg-blue-500 text-white z-20 mb-4" onClick={handleSidebarToggle} />
              <DashboardWindow />
            </div>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Dashboard;
