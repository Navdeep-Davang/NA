import * as React from "react";
import { motion } from "framer-motion";
import useListStore from "@/lib/storage/state/useListStore";
import TabToggleSkeleton from "./Skeleton";

const TabToggle: React.FC = () => {
  const { activeTab, setActiveTab, loading} = useListStore();

  const handleTabChange = (tab: 'Note' | 'Folder') => {
    
    if (activeTab !== tab) {           
      setActiveTab(tab);
    }
  };

  if (loading) {
    return <TabToggleSkeleton />; // Display skeleton while loading
  }

  return (
    <div className="flex flex-col justify-center items-center gap-2.5">
      <div className="w-96 p-2 bg-white/10 rounded-lg flex justify-center items-center gap-4 relative">
        <motion.div 
          className="absolute top-0 w-1/2 h-full bg-white/20 border border-white rounded-lg" 
          layoutId="bubble" 
          initial={false} 
          animate={{ left: activeTab === 'Note' ? 0 : '50%' }} 
          transition={{ type: "spring", bounce: 0.2, duration: 0.6 }} 
        />
        <button
          className={`w-full p-2 flex justify-center items-center gap-4 ${activeTab === 'Note' ? 'text-white' : 'text-[#dedede]'}`}
          onClick={() => handleTabChange('Note')}
        >
          Note
        </button>
        <button
          className={`w-full p-2 rounded-lg flex justify-center items-center gap-4 ${activeTab === 'Folder' ? 'text-white' : 'text-[#dedede]'}`}
          onClick={() => handleTabChange('Folder')}
        >
          Folder
        </button>
      </div>
    </div>
  );
};

export default TabToggle;







