import { Skeleton } from "@/components/ui/skeleton";

export function CreateElement() {
  return (
    <div className="space-y-6 pb-8">
      <Skeleton className="h-6 w-32 theme-skeleton-bg" />
      <div className="grid grid-cols-1 sm:grid-cols-2  gap-4">
        {Array.from({ length: 2 }).map((_, i) => (
          <div key={i} className="border rounded-lg p-4">
            <div className="flex items-center gap-2">
              <Skeleton className="h-6 w-6 theme-skeleton-bg" />
              <div className="space-y-1">
                <Skeleton className="h-4 w-16 theme-skeleton-bg" />
                <Skeleton className="h-3 w-24 theme-skeleton-bg" />
              </div>
            </div>
          </div>
        ))}
      </div>      
    </div>
  );
}