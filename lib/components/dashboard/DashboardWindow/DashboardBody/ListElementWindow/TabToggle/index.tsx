import * as React from "react";
import { motion } from "framer-motion";

interface TabToggleProps {
  activeTab: 'Note' | 'Folder';
  setActiveTab: React.Dispatch<React.SetStateAction<'Note' | 'Folder'>>;
}

const TabToggle: React.FC<TabToggleProps> = ({ activeTab, setActiveTab }) => {
  return (
    <div className=" flex flex-col justify-center items-center gap-2.5">
      <div className="w-96 p-2 bg-white/10 rounded-lg flex justify-center items-center gap-4 relative">
        <motion.div 
          className="absolute top-0 w-1/2 h-full bg-white/20 border border-white rounded-lg" 
          layoutId="bubble" 
          initial={false} 
          animate={{ left: activeTab === 'Note' ? 0 : '50%' }} 
          transition={{ type: "spring", bounce: 0.2, duration: 0.6 }} 
        />
        <button
          className={` w-full p-2  flex justify-center items-center gap-4 ${activeTab === 'Note' ? ' text-white' : 'text-[#dedede]'}`}
          onClick={() => setActiveTab('Note')}
        >
          Note
        </button>
        <button
          className={` w-full p-2 rounded-lg flex justify-center items-center gap-4 ${activeTab === 'Folder' ? ' text-white' : 'text-[#dedede]'}`}
          onClick={() => setActiveTab('Folder')}
        >
          Folder
        </button>
      </div>
    </div>
  );
};

export default TabToggle;
