// lib\components\dashboard\Sidebar\MoreOptionPanel.tsx


import { Edit, Info, FolderPlus, Trash } from 'lucide-react';
import { FavoriteIcon } from '../svg';
import { Button } from '@/components/ui/button';

interface MoreOptionPanelProps {
    type: 'note' | 'folder';
    isfavorite? : boolean
  }
  
export const MoreOptionPanel = ({ type, isfavorite }: MoreOptionPanelProps) => (
  <div className=" h-full rounded-lg flex flex-col gap-0">
    <OptionItem icon={<Edit className="w-5 h-5" />} label="Rename" />
    <OptionItem icon={<Info className="w-5 h-5" />} label="View Info" />
    
    {type === 'note' && (
      <OptionItem icon={<FolderPlus className="w-5 h-5" />} label="Move to Folder" />
    )}

{type === 'folder' && (
      isfavorite ? (
        <OptionItem 
          icon={
            <FavoriteIcon
              variant="remove"         
              width="24"  
              height="24"     
              className="list-item-text"  
            />
          }
          label="Remove from Favorite" 
        />
      ) : (
        <OptionItem 
          icon={
            <FavoriteIcon
              variant="add"         
              width="24"  
              height="24"     
              className="list-item-text"  
            />
          }
          label="Add to Favorite" 
        />
      )
    )}
    
    {/* Divider */}
    <div className="theme-divider self-stretch mt-1 h-px" />

    <OptionItem icon={<Trash className="w-5 h-5" />} label="Delete" isDestructive className="mt-2" />
  </div>
);

// Helper Component for each option
const OptionItem: React.FC<{ icon: React.ReactNode; label: string; isDestructive?: boolean,  className?: string; }> = ({
    icon,
    label,
    isDestructive = false,
    className = ''
  }) => {
    return isDestructive ? (
      <div className={`w-full  h-auto flex justify-center ${className}`}>
            <Button
                variant="destructive"
                className="flex items-centerp-2 px-4 gap-3 h-auto w-full justify-center"
            >
                {icon}
                <div className="text-base">{label}</div>
            </Button>
        </div>

      
    ) : (
      <div className="hover:memu-item-hover flex items-center gap-2 p-2 cursor-pointer rounded">
        <div className="icon-container">{icon}</div>
        <div className="text-base font-normal">{label}</div>
      </div>
    );
  };
