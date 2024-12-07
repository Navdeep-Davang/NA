import { Skeleton } from "@/components/ui/skeleton";

export function Content() {
  return (
    <div className="w-full space-y-8 animate-pulse">
      {/* Front End Task Section */}
      <div className="space-y-4">
        <Skeleton className="h-8 w-48 theme-skeleton-bg" /> {/* Front End Task heading */}
        <div className="space-y-3 ml-4">
          <Skeleton className="h-6 w-64 theme-skeleton-bg" />
          <Skeleton className="h-6 w-56  theme-skeleton-bgtheme-skeleton-bg" />
          <Skeleton className="h-6 w-72 theme-skeleton-bg" />
        </div>
      </div>

      {/* Back End Task Section */}
      <div className="space-y-4">
        <Skeleton className="h-8 w-48 theme-skeleton-bg" /> {/* Back End Task heading */}
        <div className="space-y-3 ml-4">
          <Skeleton className="h-6 w-72 theme-skeleton-bg" />
          <Skeleton className="h-6 w-64 theme-skeleton-bg" />
          <Skeleton className="h-6 w-68 theme-skeleton-bg" />
        </div>
      </div>

      {/* App Deployment Task Section */}
      <div className="space-y-4">
        <Skeleton className="h-8 w-64 theme-skeleton-bg" /> {/* App Deployment Task heading */}
        <div className="space-y-3 ml-4">
          <Skeleton className="h-6 w-72 theme-skeleton-bg" />
          <Skeleton className="h-6 w-56 theme-skeleton-bg" />
          <Skeleton className="h-6 w-48 theme-skeleton-bg" />
        </div>
      </div>
    </div>
  );
}