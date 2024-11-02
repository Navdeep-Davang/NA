import { ArrowDownNarrowWide, ArrowUpWideNarrow } from "lucide-react";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "./select";
import useListStore from "@/lib/storage/state/useListStore";
import { FolderSortBy, NoteSortBy } from "@/lib/Interface/dashboard/DashboardWindow/DashboardBody/ListElementWindow/SearchFilter/types";

export function ListSortBy() {
  const { activeTab, notesFilter, foldersFilter, setNotesFilter, setFoldersFilter } = useListStore();

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
    <div className="flex items-center text-white text-base font-medium gap-2 p-3 bg-[#e2e2e2]/10 rounded-lg">
      <Select 
        value={filter.sortBy}
        onValueChange={handleSortChange} >
        <SelectTrigger className="w-auto flex items-center whitespace-nowrap flex-shrink-0 text-ellipsis">
          <SelectValue placeholder="Sort By" className="text-base font-medium" />
        </SelectTrigger>
        <SelectContent className="mt-3">
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
        className="w-6 h-6 cursor-pointer p-0.5 rounded hover:bg-[#ffffff]/20"
        onClick={toggleSort}
      >
        {filter.order === "asc" ? (
          <ArrowDownNarrowWide className="w-full h-full transition-opacity duration-300 opacity-100 fade-in" />
        ) : (
          <ArrowUpWideNarrow className="w-full h-full transition-opacity duration-300 opacity-100 fade-in" />
        )}
      </div>
    </div>
  );
}
