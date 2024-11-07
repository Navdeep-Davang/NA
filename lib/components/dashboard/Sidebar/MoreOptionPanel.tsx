// lib\components\dashboard\Sidebar\MoreOptionPanel.tsx


import { Edit, Info, FolderPlus, HeartOff, Trash } from 'lucide-react';
import { FavoriteIcon } from '../svg';
import { Button } from '@/components/ui/button';

interface MoreOptionPanelProps {
    type: 'note' | 'folder';
  }
  
export const MoreOptionPanel = ({ type }: MoreOptionPanelProps) => (
  <div className="popup-note h-full rounded-lg flex flex-col gap-2">
    <OptionItem icon={<Edit className="w-5 h-5" />} label="Rename" />
    <OptionItem icon={<Info className="w-5 h-5" />} label="View Info" />
    
    {type === 'note' && (
      <OptionItem icon={<FolderPlus className="w-5 h-5" />} label="Move to Folder" />
    )}

    {type === 'folder' && (
      <OptionItem icon={ <FavoriteIcon
        variant= "remove" 
        strokeFill = "Gray"
        width="24"  
        height="24"     
        className="list-item-text"  
      />}
      
      label="Remove from Favorite" />
    )}
    
    {/* Divider */}
    <div className="self-stretch h-px bg-[#cac4d0]/50" />

    <OptionItem icon={<Trash className="w-5 h-5" />} label="Delete" isDestructive />
  </div>
);

// Helper Component for each option
const OptionItem: React.FC<{ icon: React.ReactNode; label: string; isDestructive?: boolean }> = ({
    icon,
    label,
    isDestructive = false,
  }) => {
    return isDestructive ? (
        <div className="w-full h-auto flex justify-center">
            <Button
                variant="destructive"
                className="flex items-centerp-2 px-4 gap-3 h-auto w-full justify-center"
            >
                {icon}
                <div className="text-base">{label}</div>
            </Button>
        </div>

      
    ) : (
      <div className="popover-option flex items-center gap-2 p-2 cursor-pointer hover:bg-[#333]/10 rounded">
        <div className="icon-container">{icon}</div>
        <div className="text-base font-normal">{label}</div>
      </div>
    );
  };
