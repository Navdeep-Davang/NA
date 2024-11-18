// lib\components\dashboard\DashboardWindow\DashboardBody\ListElementWindow\PaginationBar\Skeleton.tsx

import { Skeleton } from "@/components/ui/skeleton";

export function PaginationBarSkeleton() {
  return (
    <div className="flex justify-center items-center space-x-2 ">
    
      {/* Chevron Left Skeleton */}
      <div className="p-1 justify-center items-center  rounded-lg">
        <Skeleton className="w-6 h-6 theme-skeleton-bg rounded" />
      </div>

      {/* Page Number Skeletons */}
      {Array.from({ length: 3 }).map((_, index) => (
        <div key={index} className="p-1 justify-center items-center  py-1">
          <Skeleton className="w-8 h-8 theme-skeleton-bg rounded-md" />
        </div>
      ))}

      {/* Chevron Right Skeleton */}
      <div className="p-1 justify-center items-center rounded-lg">
        <Skeleton className="w-6 h-6 theme-skeleton-bg rounded" />
      </div>

     
    </div>
  );
}
