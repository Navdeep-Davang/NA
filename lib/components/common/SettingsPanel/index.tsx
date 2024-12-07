import { Dialog, DialogContent, DialogPortal } from "@radix-ui/react-dialog";
import { useAppStore } from "@/lib/storage/state/useAppStore";
import { Moon, User } from "lucide-react";
import Appearance from "./Appearance";
import UserProfile from "./UserProfile";

const SettingsPanel = () => {
  const { isSettingsOpen, settingsTab, setSettingsTab } = useAppStore();

  return (
    <>
      {isSettingsOpen && (
        <Dialog open={isSettingsOpen}>
          <DialogPortal>
            <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-10" />
            <DialogContent className="fixed inset-0 flex items-center justify-center z-50">
              <div className="flex h-[600px] w-[800px] text-white rounded-2xl overflow-hidden">
                {/* Sidebar */}
                <div className="flex flex-col w-1/4 bg-[#474747] p-4">
                  <div className="text-xl font-medium mb-4">Settings</div>
                  <div
                    className={`flex items-center rounded-lg p-2 cursor-pointer ${
                      settingsTab === "appearance" ? "bg-white/20" : ""
                    }`}
                    onClick={() => setSettingsTab("appearance")}
                  >
                    <Moon className="w-5 h-5 mr-2" />
                    <span>Appearance</span>
                  </div>
                  <div
                    className={`flex items-center rounded-lg p-2 cursor-pointer ${
                      settingsTab === "userProfile" ? "bg-white/20" : ""
                    }`}
                    onClick={() => setSettingsTab("userProfile")}
                  >
                    <User className="w-5 h-5 mr-2" />
                    <span>User Profile</span>
                  </div>
                </div>

                {/* Content Area */}
                <div className="flex-1 bg-[#393939] p-4">
                  {settingsTab === "appearance" && <Appearance />}
                  {settingsTab === "userProfile" && <UserProfile />}
                </div>
              </div>
            </DialogContent>
          </DialogPortal>
        </Dialog>
      )}
    </>
  );
};

export default SettingsPanel;
