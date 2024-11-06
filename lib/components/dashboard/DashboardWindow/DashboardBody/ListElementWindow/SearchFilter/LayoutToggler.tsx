// lib\components\dashboard\DashboardWindow\DashboardBody\ListElementWindow\SearchFilter\LayoutToggler.tsx

import useListStore from '@/lib/storage/state/useListStore';
import { LayoutGrid, List } from 'lucide-react';
import React from 'react';


const LayoutToggler = () => {

    const { viewMode, setViewMode} = useListStore();
  
    return (
    <div className="ViewAs h-12 px-2 bg-white/10 rounded-lg justify-center items-center gap-3 inline-flex">
      <div
        className="List p-1 justify-start items-center gap-2.5 flex cursor-pointer"
        onClick={() => setViewMode('List')}
      >
        <List
          className={`w-6 h-6 ${viewMode === 'List' ? 'view-mode-icon-selected' : 'view-mode-icon-off'}`}
        />
      </div>      
      <div
        className="Grid p-1 justify-start items-center gap-2.5 flex cursor-pointer"
        onClick={() => setViewMode('Grid')}
      >
        <LayoutGrid
          className={`w-6 h-6 ${viewMode === 'Grid' ? 'view-mode-icon-selected' : 'view-mode-icon-off'}`}
        />
      </div>
      
    </div>
    );
};

export default LayoutToggler;
