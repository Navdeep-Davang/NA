// lib/components/dashboard/DashboardWindow/DashboardBody/ListElementWindow/SearchFilter/index.tsx

import * as React from "react";
import ListSearch from "./ListSearch"; // Adjust the import path as necessary
import { ListCategory } from "./ListCategory";
import { ListSortBy } from "./ListSortBy";
import useListStore from "@/lib/storage/state/useListStore";
import SearchFilterSkeleton from "./Skeleton";
import LayoutToggler from "./LayoutToggler";


const SearchFilter = () => {

  const { activeTab, loading } = useListStore();


  if (loading) {
    return <SearchFilterSkeleton />; // You could replace this with a spinner or skeleton
  }

  return (
    <div className="Head p-2 flex flex-wrap gap-4 justify-between items-center">
      <div className="Name flex justify-center items-center gap-2.5">
      <span className="listview-filter-title text-lg font-medium">
          {activeTab === 'Folder' ? 'Listed Folders' : 'Listed Notes'}
        </span>
      </div>
      <div className="flex flex-wrap justify-center items-center gap-4">
        <ListSearch />
        <ListCategory />
        <ListSortBy/>
        <LayoutToggler/>       
      </div>
    </div>
  );
};

export default SearchFilter;
