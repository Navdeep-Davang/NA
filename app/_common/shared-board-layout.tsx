// app\_common\shared-board-layout.tsx
"use client";

import React, { createContext, useEffect, useState } from 'react';
import "@/lib/styles/dashboard/Dashboard.css";
import { useWindowType } from '@/hooks/useWindowType';
import { SidebarProvider } from '@/components/ui/sidebar'; // Import SidebarProvider
import { DashboardSkeleton } from '@/lib/components/dashboard/Skeleton';

// Create a context for window type
export const WindowContext = createContext({
  isMobileWindow: false,
  isTabletWindow: false,
  isDesktopWindow: false,
  isSidebarCollapsed: false,
  isSmallDevice: false,
  sidebarWidth: "250px"
});

type LayoutType = "dashboard" | "editor";


const SharedBoardLayout: React.FC<{ children: React.ReactNode; layoutType: LayoutType }> = ({ children, layoutType }) => {
  const [isLayoutReady, setIsLayoutReady] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const windowType = useWindowType();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(
    windowType.isMobileWindow || windowType.isTabletWindow
  );
  const [isSmallDevice, setIsSmallDevice] = useState(
    windowType.isMobileWindow || windowType.isTabletWindow
  );

  const sidebarWidth = isSidebarCollapsed || isSmallDevice
  ? '0px'  // Collapsed state for mobile or tablet
  : windowType.isDesktopWindow
  ? 'var(--sidebar-width, 250px)'  // Default width for desktop
  : '0px';  // Default collapsed state for other screen sizes

 

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (windowType.isMobileWindow !== undefined && windowType.isTabletWindow !== undefined) {
      setIsLayoutReady(true)
    }
  }, [windowType]);

  if (!isLayoutReady || !isClient) {
    return (
      <div className="min-h-screen custom-scrollbar">
         {layoutType === "dashboard" ? <DashboardSkeleton /> : <DashboardSkeleton />}
      </div>
    );
  }

  return (
    <WindowContext.Provider value={{ ...windowType, isSidebarCollapsed, isSmallDevice, sidebarWidth }}>
      <SidebarProvider
        setIsSidebarCollapsed={setIsSidebarCollapsed}
        setIsSmallDevice={setIsSmallDevice}
      >
        <div className="no-user-select w-full overflow-hidden">{children}</div>
      </SidebarProvider>
    </WindowContext.Provider>
  );
};

export default SharedBoardLayout;
