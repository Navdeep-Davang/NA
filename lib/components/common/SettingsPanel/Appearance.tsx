// Assuming the store is in the 'store' directory

import { useAppStore } from "@/lib/storage/state/useAppStore";
import { X } from "lucide-react";

const Appearance = () => {
  const { setSettingsTab, closeSettings } = useAppStore();

  return (
    <div className="PopupThemeSettings w-full h-full  p-4 rounded-tr-2xl rounded-br-2xl flex-col justify-start items-start gap-4 inline-flex">
      {/* Theme Settings Header */}
      <div className="self-stretch p-1 border-b border-neutral-400 flex-col justify-center items-start gap-2 flex">
        <div className="Heading self-stretch justify-between items-start inline-flex">
          <div className="Title flex-col justify-start items-start gap-1 inline-flex">
            <div className="ThemeSettings text-center text-white text-lg font-medium  tracking-tight">
              Theme Settings
            </div>
          </div>
          <div
            className="Close w-6 h-6 p-1 justify-center items-center flex cursor-pointer"
            onClick={() => {
              closeSettings(); // Close the settings modal
              setSettingsTab('appearance'); // Optionally, set 'appearance' as the active tab
            }}
          >
            <X className="w-6 h-6 cursor-pointer" />
          </div>
        </div>
        <div className="Action self-stretch h-6 justify-start items-center gap-4 inline-flex">
          <div className="CustomizeYourQuickNoteAppearance grow shrink basis-0 text-neutral-400 text-sm font-normal  leading-tight tracking-tight">
            Customize your Quick Note Appearance
          </div>
        </div>
      </div>


      {/* Color Mode Section */}
      <div className="self-stretch p-2 flex-col justify-center items-start flex">
        <div className="Title flex-col justify-start items-start gap-1 flex">
          <div className="ColorMode text-center text-white text-base font-medium  leading-normal tracking-tight">
            Color Mode
          </div>
        </div>
        <div className="Action self-stretch justify-between items-center flex">
          <div className="ChooseYourColorMode text-center text-neutral-400 text-sm font-normal  leading-tight tracking-tight">
            Choose Your Color Mode
          </div>
          <div className="Frame54 px-4 py-2 justify-start items-center gap-2 flex">
            <div className="UnselectedColorMode px-3 py-2 bg-zinc-700 rounded justify-start items-center gap-2 flex cursor-pointer">
              <div className="Dark text-center text-neutral-400 text-xs font-normal  leading-none tracking-tight">
                System
              </div>
            </div>
            <div className="UnselectedColorMode px-3 py-2 bg-zinc-700 rounded justify-start items-center gap-2 flex cursor-pointer">
              <div className="Dark text-center text-neutral-400 text-xs font-normal  leading-none tracking-tight">
                Light
              </div>
            </div>
            <div className="SelectedColorMode px-3 py-2 bg-zinc-500 rounded border border-white justify-start items-center gap-2 flex cursor-pointer">
              <div className="Dark text-center text-neutral-50 text-xs font-normal  leading-none tracking-tight">
                Dark
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Appearance;
