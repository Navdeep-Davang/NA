// lib/components/dashboard/index.tsx
"use client";

import React, { useContext, useRef, useState } from "react";
import { Sidebar } from "@/components/ui/sidebar";
import UpperPart from "@/lib/components/common/Sidebar/UpperPart";
import BottomPart from "@/lib/components/common/Sidebar/BottomPart";
import { mydata } from "@/lib/storage/data/dashboard/Sidebar/db";
import { useAppStore } from "@/lib/storage/state/useAppStore";
import { WindowContext } from "@/app/_common/shared-board-layout";
import SettingsPanel from "./SettingsPanel";

const MIN_SIDEBAR_WIDTH = 200;
const MAX_SIDEBAR_WIDTH = 300;


interface SharedBoardLayoutProps {
    children: React.ReactNode;
}
  

const SharedBoardLayout: React.FC<SharedBoardLayoutProps> = ({ children }) => {
  const sidebarRef = useRef<HTMLDivElement>(null);
  const { sidebarWidth } = useContext(WindowContext);
  const [isResizing, setIsResizing] = useState(false);
    
  
  const { isSettingsOpen } = useAppStore();

  // Dragging logic for resizing sidebar
  const handleMouseMove = (e: MouseEvent) => {
    if (sidebarRef.current) {
      const newWidth = e.clientX - sidebarRef.current.getBoundingClientRect().left;
      if (newWidth >= MIN_SIDEBAR_WIDTH && newWidth <= MAX_SIDEBAR_WIDTH) {
        sidebarRef.current.style.setProperty('--sidebar-width', `${newWidth}px`);
      }
    }
  };

  const handleMouseDown = () => {
    setIsResizing(true);
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", () => {
      setIsResizing(false);
      document.removeEventListener("mousemove", handleMouseMove);
    }, { once: true });
  };

  return (
    <div className="flex h-screen w-full">
      <div
        ref={sidebarRef}
        className={`relative flex-shrink-0 ${
          isResizing ? 'transition-none' : 'transition-all duration-200 ease-in-out'
        }`}
        style={{ width: sidebarWidth }}
      >
        <Sidebar
          collapsible="offcanvas"
          isResizing={isResizing}
          className={`${isResizing ? 'transition-none' : 'transition-all duration-200 ease-in-out'} no-user-select border-transparent`}
        >
          <div className="flex-grow">
            <UpperPart {...mydata} />
          </div>
          <BottomPart />
        </Sidebar>
        <div
          className="absolute right-0 top-0 h-full w-2 cursor-w-resize z-10"
          onMouseDown={handleMouseDown}
        ></div>
      </div>
      <div className="flex-1 h-full">
        {isSettingsOpen && <SettingsPanel />}
        {children}
      </div>
    </div>
  );
};

export default SharedBoardLayout;
