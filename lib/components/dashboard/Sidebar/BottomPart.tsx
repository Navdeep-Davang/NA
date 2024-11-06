// lib\components\dashboard\Sidebar\BottomPart.tsx

import { SidebarMenuButton, SidebarMenuItem, SidebarFooter } from "@/components/ui/sidebar";
import { useAppStore } from "@/lib/storage/state/useAppStore";
import { Settings, LogOut } from "lucide-react";

export function BottomPart() {
  const { openSettings } = useAppStore();

  return (
    <SidebarFooter className=" gap-0 pr-2 pl-2 pb-2 ">
      <SidebarMenuItem>
        <SidebarMenuButton size="lg" onClick={openSettings}>
          <div className=" flex items-center">
            <Settings className="mr-2" />
            <span className="truncate font-semibold">Settings</span>
          </div>
        </SidebarMenuButton>
      </SidebarMenuItem>
      <SidebarMenuItem>
        <SidebarMenuButton size="lg">
          <div className="flex items-center">
            <LogOut className="mr-2" />
            <span className="truncate font-semibold">Log out</span>
          </div>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarFooter>
  );
}

export default BottomPart;
