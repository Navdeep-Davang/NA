import { Skeleton } from "@/components/ui/skeleton";

export function RecentElement() {
  return (
    <div className="space-y-6 pb-8">
      <div className="block">
        <Skeleton className="h-6 w-32 theme-skeleton-bg" />
        <div className="grid grid-cols-2 pt-4 gap-2 sm:gap-4 sm:grid-cols-3">
          {/* Only display 2 items on small screens and 3 items on larger screens */}
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className={`border rounded-lg p-2 sm:p-4 space-y-2 ${
                i >= 2 ? "hidden sm:block" : ""
              }`} // Hide the third item on smaller screens
            >
              <Skeleton className="h-24 sm:h-40 w-full theme-skeleton-bg" />
              <Skeleton className="h-3 sm:h-4 w-3/4 theme-skeleton-bg" />
              <div className="flex items-center justify-between">
                <Skeleton className="h-2 sm:h-3 w-1/4 theme-skeleton-bg" />
                <Skeleton className="h-4 sm:h-6 w-4 sm:w-6 rounded-full theme-skeleton-bg" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
