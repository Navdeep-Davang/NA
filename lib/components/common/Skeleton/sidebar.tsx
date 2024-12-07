import { Skeleton } from "@/components/ui/skeleton";

const skeletonItems = Array.from({ length: 4 });

interface SidebarProps {
    className?: string;
  }


export function Sidebar({ className = "" }: SidebarProps) {
    
  return (
    <div className={`w-60 border-r bg-background p-4 ${className}`}>
      {/* Header Section */}
      <div className="flex items-center gap-2 mb-6">
        <Skeleton className="h-8 w-8 rounded theme-skeleton-bg" />
        <div className="space-y-1">
          <Skeleton className="h-4 w-24 theme-skeleton-bg" />
          <Skeleton className="h-3 w-16 theme-skeleton-bg" />
        </div>
      </div>

      {/* First Item Section */}
      <div className="space-y-1 mb-4">
        <div className="flex items-center gap-2 p-2">
          <Skeleton className="h-4 w-4 rounded-full theme-skeleton-bg" />
          <Skeleton className="h-4 w-20 theme-skeleton-bg" />
        </div>
      </div>

      {/* Menu Section */}
      <div className="mb-4">
        <Skeleton className="h-4 w-16 mb-2 theme-skeleton-bg" />
        <div className="space-y-1">
          {skeletonItems.map((_, i) => (
            <div key={i} className="flex items-center gap-2 p-2">
              <Skeleton className="h-4 w-4 theme-skeleton-bg" />
              <Skeleton className="h-4 w-24 theme-skeleton-bg" />
            </div>
          ))}
        </div>
      </div>

      {/* Footer Section */}
      <div className="mb-4">
        <Skeleton className="h-4 w-20 mb-2 theme-skeleton-bg" />
      </div>
    </div>
  );
}
