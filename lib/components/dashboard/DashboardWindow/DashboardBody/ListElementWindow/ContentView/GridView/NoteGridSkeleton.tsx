// lib\components\dashboard\DashboardWindow\DashboardBody\ListElementWindow\ContentView\GridView\NoteGridSkeleton.tsx

import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const NoteGridSkeleton: React.FC = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
      {[...Array(12)].map((_, index) => (
        <Card
          key={index}
          className="border-transparent p-4 bg-white/10 rounded-lg flex flex-col justify-start items-center gap-4"
        >
          <div className="self-stretch h-40 rounded-lg flex justify-center items-center">
            <Skeleton className="w-full h-full rounded-lg bg-white/20  " />
          </div>
          <div className="self-stretch flex justify-between items-center">
            <div className="pl-2 flex flex-col justify-start items-start gap-1 flex-grow">
              <Skeleton className="w-3/4 h-5 rounded bg-white/10 " />
              <Skeleton className="w-1/2 h-4 rounded bg-white/10 " />
            </div>
            <Skeleton className="w-8 h-8 rounded bg-white/10 " />
          </div>
        </Card>
      ))}
    </div>
  );
};

export default NoteGridSkeleton;
