// lib/components/dashboard/DashboardWindow/DashboardBody/ListElementWindow/SearchFilter/index.tsx

import * as React from "react";
import { LayoutGrid, List } from "lucide-react"; // Import the icons you're using
import ListSearch from "./ListSearch"; // Adjust the import path as necessary
import { ListCategory } from "./ListCategory";
import { ListSortBy } from "./ListSortBy";


interface SearchFilterProps {
  viewMode: 'Grid' | 'List';
  activeTab: 'Note' | 'Folder';
  setViewMode: React.Dispatch<React.SetStateAction<'Grid' | 'List'>>;
}

const SearchFilter: React.FC<SearchFilterProps> = ({ activeTab, viewMode, setViewMode }) => {
  return (
    <div className="Head h-16 p-2 flex flex-wrap gap-4 justify-between items-center">
      <div className="Name flex justify-center items-center gap-2.5">
      <span className="text-white text-lg font-medium">
          {activeTab === 'Folder' ? 'Listed Folders' : 'Listed Notes'}
        </span>
      </div>
      <div className="Frame71 h-12 flex justify-center items-center gap-4">
        <ListSearch />
        <ListCategory />
        <ListSortBy  activeTab ={ activeTab}/>

        <div className="ViewAs h-12 px-2 bg-white/10 rounded-lg justify-center items-center gap-3 inline-flex">
          <div
            className="Grid p-1 justify-start items-center gap-2.5 flex cursor-pointer"
            onClick={() => setViewMode('Grid')}
          >
            <LayoutGrid className={`w-6 h-6 ${viewMode === 'Grid' ? 'view-mode-icon-selected' : 'view-mode-icon-off'}`} />
          </div>
          <div
            className="List p-1 justify-start items-center gap-2.5 flex cursor-pointer"
            onClick={() => setViewMode('List')}
          >
            <List className={`w-6 h-6 ${viewMode === 'List' ? 'view-mode-icon-selected' : 'view-mode-icon-off'}`} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchFilter;
