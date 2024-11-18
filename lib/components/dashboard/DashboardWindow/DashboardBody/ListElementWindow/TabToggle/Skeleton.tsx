import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const TabToggleSkeleton: React.FC = () => (
  <div className="flex flex-col justify-center items-center gap-2.5">
    <div className="w-96 p-2 py-3 theme-skeleton-bg rounded-lg flex justify-center items-center gap-4 relative">
      {/* Simulating the selected tab indicator */}
      <div className="absolute top-0 left-0 w-1/2 h-full theme-skeleton-border rounded-lg" />
      <button
        className={`w-full p-2 flex justify-center items-center gap-4`} // Note tab is selected
      >
        <Skeleton className="h-4 w-full theme-skeleton-text" /> {/* Skeleton for Note Tab */}
      </button>
      <button
        className={`w-full p-2 rounded-lg flex justify-center items-center gap-4`} // Folder tab is unselected
      >
        <Skeleton className="h-4 w-full theme-skeleton-bg" /> {/* Skeleton for Folder Tab */}
      </button>
    </div>
  </div>
);

export default TabToggleSkeleton;
