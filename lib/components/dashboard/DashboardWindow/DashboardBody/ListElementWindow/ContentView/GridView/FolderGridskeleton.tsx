// lib\components\dashboard\DashboardWindow\DashboardBody\ListElementWindow\ContentView\GridView\FolderGridSkeleton.tsx

import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";


interface FolderGridSkeletonProps {
  columnCount: number;
}

const FolderGridSkeleton: React.FC<FolderGridSkeletonProps> = ({ columnCount }) => {
  return (
    <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-${columnCount} gap-8`}>
      {[...Array(10)].map((_, index) => (
        <Card
          key={index}
          className="border-transparent p-4 theme-skeleton-bg rounded-lg flex flex-col justify-start items-center gap-4"
        >
          {/* Folder icon placeholder */}
          <div className="w-full h-40 p-2 theme-skeleton-bg rounded-lg flex justify-center items-center">
            <Skeleton className="w-32 h-32 rounded-lg theme-skeleton-bg" />
          </div>
          
          {/* Folder details placeholder */}
          <div className="self-stretch flex justify-between items-center">
            <div className="pl-2 flex flex-col justify-start items-start gap-4 flex-grow">
              <Skeleton className="w-3/4 h-5 rounded theme-skeleton-bg" /> {/* Folder name */}
              <Skeleton className="w-1/2 h-4 rounded theme-skeleton-bg" /> {/* File count */}
            </div>
            <Skeleton className="w-8 h-8 rounded theme-skeleton-bg" /> {/* More icon */}
          </div>
        </Card>
      ))}
    </div>
  );
};

export default FolderGridSkeleton;
