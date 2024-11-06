// lib\components\dashboard\DashboardWindow\DashboardBody\ListElementWindow\PaginationBar\Skeleton.tsx

import { Skeleton } from "@/components/ui/skeleton";

export function PaginationBarSkeleton() {
  return (
    <div className="flex justify-center items-center space-x-2 text-white">
    
      {/* Chevron Left Skeleton */}
      <div className="p-1  rounded-lg">
        <Skeleton className="w-6 h-6 bg-white/10 rounded" />
      </div>

      {/* Page Number Skeletons */}
      {Array.from({ length: 5 }).map((_, index) => (
        <div key={index} className="p-1  py-1">
          <Skeleton className="w-8 h-8 bg-white/10 rounded-md" />
        </div>
      ))}

      {/* Chevron Right Skeleton */}
      <div className="p-1  rounded-lg">
        <Skeleton className="w-6 h-6 bg-white/10 rounded" />
      </div>

     
    </div>
  );
}
