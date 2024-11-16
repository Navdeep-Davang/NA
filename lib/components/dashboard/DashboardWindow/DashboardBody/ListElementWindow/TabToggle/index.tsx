import * as React from "react";
import { motion } from "framer-motion";
import useListStore from "@/lib/storage/state/useListStore";
import TabToggleSkeleton from "./Skeleton";

const TabToggle: React.FC = () => {
  const { activeTab, setActiveTab, loading} = useListStore();

  if (loading) {
    return <TabToggleSkeleton />; // Display skeleton while loading
  }

  const handleTabChange = (tab: 'Note' | 'Folder') => {
    
    if (activeTab !== tab) {           
      setActiveTab(tab);
    }
  };

  

  return (
    <div className="flex flex-col justify-center items-center gap-2.5">
      <div className="w-96 p-2 listview-tab-wrapper rounded-lg flex justify-center items-center gap-4 relative">
        <motion.div 
          className="listview-tab-bubble border absolute top-0 w-1/2 h-full rounded-lg" 
          layoutId="bubble" 
          initial={false} 
          animate={{ left: activeTab === 'Note' ? 0 : '50%' }} 
          transition={{ type: "spring", bounce: 0.2, duration: 0.6 }} 
        />
        <button
          className={`w-full p-2 flex focus:outline-none z-10 justify-center items-center text-lg font-semibold gap-4 ${activeTab === 'Note' ? 'listview-tab-active cursor-default' : 'listview-tab-inactive'}`}
          onClick={() => handleTabChange('Note')}
        >
          Note
        </button>
        <button
          className={`w-full p-2 flex focus:outline-none z-10 justify-center items-center text-lg font-semibold gap-4 ${activeTab === 'Folder' ? 'listview-tab-active cursor-default ' : 'listview-tab-inactive'}`}
          onClick={() => handleTabChange('Folder')}
        >
          Folder
        </button>
      </div>
    </div>
  );
};

export default TabToggle;







