
import { Header } from "./header";
import { Sidebar } from "../../common/Skeleton/sidebar";
import { Content } from "./Body/Content";

export function EditorSkeleton() {
  return (
    <div className="flex h-full ">
        <div className="w-60 border-r bg-background lg:block hidden">
            <Sidebar />
        </div>
        <div className="flex-1">
            <Header/>
            <main className="p-6 gap-6">
                <Content/>
            </main>
        </div>
    </div>
  );
}