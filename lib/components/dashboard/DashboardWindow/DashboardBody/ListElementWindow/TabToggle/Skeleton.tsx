import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const TabToggleSkeleton: React.FC = () => (
  <div className="flex flex-col justify-center items-center gap-2.5">
    <div className="w-96 p-2 bg-white/10 rounded-lg flex justify-center items-center gap-4 relative">
      {/* Simulating the selected tab indicator */}
      <div className="absolute top-0 left-0 w-1/2 h-full bg-white/20 border border-white rounded-lg" />
      <button
        className={`w-full p-2 flex justify-center items-center gap-4 text-white`} // Note tab is selected
      >
        <Skeleton className="h-5 w-full bg-white/20" /> {/* Skeleton for Note Tab */}
      </button>
      <button
        className={`w-full p-2 rounded-lg flex justify-center items-center gap-4 text-[#dedede]`} // Folder tab is unselected
      >
        <Skeleton className="h-5 w-full  bg-white/10" /> {/* Skeleton for Folder Tab */}
      </button>
    </div>
  </div>
);

export default TabToggleSkeleton;
