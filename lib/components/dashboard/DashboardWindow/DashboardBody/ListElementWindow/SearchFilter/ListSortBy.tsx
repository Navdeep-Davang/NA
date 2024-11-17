import {  ArrowDownWideNarrow, ArrowUpNarrowWide } from "lucide-react";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "./select";
import useListStore from "@/lib/storage/state/useListStore";
import { FolderSortBy, NoteSortBy } from "@/lib/Interface/dashboard/DashboardWindow/DashboardBody/ListElementWindow/SearchFilter/types";
import { cn } from "@/lib/utils";
import { useState } from "react";

export function ListSortBy() {
  const { activeTab, notesFilter, foldersFilter, setNotesFilter, setFoldersFilter } = useListStore();
  const [isOpen, setIsOpen] = useState(false);

  const filter = activeTab === "Note" ? notesFilter : foldersFilter;
  const setFilter = activeTab === "Note" ? setNotesFilter : setFoldersFilter;

  const handleSortChange = (value: string) => {
    if (activeTab === "Folder") {
      setFoldersFilter({ sortBy: value as FolderSortBy });
    } else if (activeTab === "Note") {
      setNotesFilter({ sortBy: value as NoteSortBy });
    }
  };

  // Toggle between ascending and descending order
  const toggleSort = () => {
    setFilter({ order: filter.order === "asc" ? "desc" : "asc" });
  };
  

  return (
    <div className={cn(
      "flex items-center text-base font-medium gap-2 p-3 rounded-lg",
      isOpen ? "listview-filter-active" : "listview-filter-inactive",
      "hover:listview-filter-hover"
    )}>
      <Select 
        value={filter.sortBy}
        onValueChange={handleSortChange}
        onOpenChange={setIsOpen}
      >
        <SelectTrigger className= {cn(
          "w-auto flex listview-filter-title items-center whitespace-nowrap flex-shrink-0 shadow-none text-ellipsis"
        )}>
          <SelectValue placeholder="Sort By" className="text-base" />
        </SelectTrigger>
        <SelectContent className="mt-3 listview-filter-panel">
          <SelectGroup>
            <SelectItem value="updatedDate">Last Updated</SelectItem>
            <SelectItem value="createdDate">Date Created</SelectItem>
            <SelectItem value="name">Name</SelectItem>
            {activeTab === 'Folder' && (
              <SelectItem value="fileCount">File Count</SelectItem>
            )}
          </SelectGroup>
        </SelectContent>
      </Select>
      <div
        className="w-6 h-6 cursor-pointer p-0.5 rounded hover:listview-filter-hover"
        onClick={toggleSort}
      >
        {filter.order === "asc" ? (
          <ArrowUpNarrowWide className="w-full h-full transition-opacity duration-300 opacity-100 fade-in" />
        ) : (
          <ArrowDownWideNarrow className="w-full h-full transition-opacity duration-300 opacity-100 fade-in" />
        )}
      </div>
    </div>
  );
}
