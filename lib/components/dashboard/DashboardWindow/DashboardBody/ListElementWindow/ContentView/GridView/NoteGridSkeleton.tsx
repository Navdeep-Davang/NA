// lib\components\dashboard\DashboardWindow\DashboardBody\ListElementWindow\ContentView\GridView\NoteGridSkeleton.tsx

import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { number } from "zod";

interface NoteGridSkeletonProps {
  columnCount?: number;
  arraycount? : number
}

const NoteGridSkeleton: React.FC<NoteGridSkeletonProps> = ({ columnCount , arraycount =10 }) => {
  return (
    <div              
      className="grid gap-6"
      style={{
        gridTemplateColumns: `repeat(${columnCount}, minmax(0, 1fr))`,
      }}
    >
      {[...Array(arraycount)].map((_, index) => (
        <Card
          key={index}
          className="border-transparent p-4 theme-skeleton-bg  rounded-lg flex flex-col justify-start items-center gap-4"
        >
          <div className="self-stretch h-40 rounded-lg flex justify-center items-center">
            <Skeleton className="w-full h-full rounded-lg theme-skeleton-text  " />
          </div>
          <div className="self-stretch flex justify-between items-center">
            <div className="pl-2 flex flex-col justify-start items-start gap-4 flex-grow">
              <Skeleton className="w-3/4 h-5 rounded theme-skeleton-bg  " />
              <Skeleton className="w-1/2 h-4 rounded theme-skeleton-bg  " />
            </div>
            <Skeleton className="w-8 h-8 rounded theme-skeleton-bg  " />
          </div>
        </Card>
      ))}
    </div>
  );
};

export default NoteGridSkeleton;
