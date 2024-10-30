// app/dashboard/loading.tsx

import { Skeleton } from "@/components/ui/skeleton";

const DashboardLoading  = () => {
  return (
    <div className="flex h-screen w-full">
      {/* Sidebar skeleton */}
      <div className="relative flex-shrink-0 transition-all duration-200 ease-in-out" style={{ width: 'var(--sidebar-width, 250px)' }}>
        <div className="flex-grow">
          {/* Upper part of the sidebar */}
          <Skeleton className="h-[50px] w-full mb-4" /> {/* Mocking app logo and user info */}
          <Skeleton className="h-[40px] w-[90%] mb-2" /> {/* Mocking UpperPart components */}
          <Skeleton className="h-[40px] w-[85%]" /> {/* Mocking another element */}
        </div>
        {/* Bottom part */}
        <Skeleton className="h-[60px] w-full mt-4" /> {/* Mocking BottomPart components */}
      </div>

      {/* Main content area skeleton */}
      <div className="flex-grow flex flex-col w-full p-4">
        {/* Sidebar trigger skeleton */}
        <Skeleton className="h-8 w-[150px] mb-4" /> {/* Mocking SidebarTrigger */}
        
        {/* Dashboard window content */}
        <div className="flex-grow">
          <Skeleton className="h-10 w-[90%] mb-4" /> {/* Mocking a header section */}
          <Skeleton className="h-64 w-full mb-4" /> {/* Mocking large content section */}
          <Skeleton className="h-32 w-[95%] mb-4" /> {/* Mocking another content element */}
        </div>
      </div>
    </div>
  );
};

export default DashboardLoading ;
