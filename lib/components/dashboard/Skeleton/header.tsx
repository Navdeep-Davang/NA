import { Skeleton } from "@/components/ui/skeleton";

export function Header() {
  return (
    <div className="border-b">
      <div className="px-6 py-3 flex justify-center">
        <Skeleton className="h-6 w-80 theme-skeleton-bg" />
      </div>
    </div>
  );
}