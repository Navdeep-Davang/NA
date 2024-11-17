// lib\components\dashboard\DashboardWindow\DashboardBody\ListElementWindow\SearchFilter\LayoutToggler.tsx

import useListStore from '@/lib/storage/state/useListStore';
import { LayoutGrid, List } from 'lucide-react';
import React from 'react';


const LayoutToggler = () => {

    const { viewMode, setViewMode} = useListStore();
  
    return (
    <div className=" h-auto p-1 hover:cursor-default listview-filter-inactive hover:listview-filter-hover rounded-lg justify-center items-center gap-0 inline-flex">
      <div
        className="List p-2 justify-start items-center  flex cursor-pointer"
        onClick={() => setViewMode('List')}
      >
        <List
          className={`w-6 h-6 ${viewMode === 'List' ? 'listview-filter-title cursor-default' : 'listview-filter-icon-inactive hover:listview-filter-text'}`}
        />
      </div>      
      <div
        className="Grid p-2 justify-start items-center flex cursor-pointer"
        onClick={() => setViewMode('Grid')}
      >
        <LayoutGrid
          className={`w-6 h-6 ${viewMode === 'Grid' ? 'listview-filter-title cursor-default' : 'listview-filter-icon-inactive hover:listview-filter-text'}`}
        />
      </div>
      
    </div>
    );
};

export default LayoutToggler;
