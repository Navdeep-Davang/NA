import { Skeleton } from "@/components/ui/skeleton";

export function ContentElement() {
    return (
      <div className="space-y-4 pb-6">
        {/* Visible for all devices */}
        <div className="flex gap-2 justify-center">
          <Skeleton className="h-9 w-24 rounded theme-skeleton-bg" />
          <Skeleton className="h-9 w-24 rounded theme-skeleton-bg" />
        </div>
  
        {/* This section is hidden on mobile (sm) */}
        <div className=" justify-between items-center hidden sm:flex">
          <Skeleton className="h-6 w-32 theme-skeleton-bg" />
          <div className="flex items-center gap-4">
            <Skeleton className="h-8 w-40 hidden md:block theme-skeleton-bg" />
            <Skeleton className="h-8 w-24 hidden md:block theme-skeleton-bg" />
            <Skeleton className="h-8 w-32 theme-skeleton-bg" />
            <div className="flex gap-2">
              <Skeleton className="h-8 w-8 theme-skeleton-bg" />
              <Skeleton className="h-8 w-8 theme-skeleton-bg" />
            </div>
          </div>
        </div>
  
        {/* This section is only visible on mobile (below sm) */}
        <div className="sm:hidden flex justify-between items-center">
          <Skeleton className="h-6 w-24 theme-skeleton-bg" />
          <div className="flex items-center gap-2">
            <Skeleton className="h-6 w-32 theme-skeleton-bg" />
            <Skeleton className="h-6 w-16 theme-skeleton-bg" />
          </div>
        </div>
  
        {/* Grid layout adjusts based on screen size */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="border rounded-lg p-4 space-y-2">
              <Skeleton className="h-20 w-full theme-skeleton-bg" />
              <Skeleton className="h-4 w-3/4 theme-skeleton-bg" />
              <Skeleton className="h-3 w-1/4 theme-skeleton-bg" />
            </div>
          ))}
        </div>
  
        {/* Icon section - shown only on large screens (lg) */}
        <div className="hidden lg:flex justify-center gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-8 w-8 rounded theme-skeleton-bg" />
          ))}
        </div>
      </div>
    );
  }
  