import { ContentElement } from "./Body/ContentElement";
import { CreateElement } from "./Body/CreateElement";
import { RecentElement } from "./Body/RecentElement";
import { Header } from "./header";
import { Sidebar } from "./sidebar";



export function DashboardSkeleton() {
  return (
    <div className="flex h-full ">
        <div className="w-60 border-r bg-background lg:block hidden">
            <Sidebar />
        </div>
        <div className="flex-1">
            <Header/>
            <main className="p-6 gap-6">
                <RecentElement/>
                <CreateElement/>
                <ContentElement/>
            </main>
        </div>
    </div>
  );
}