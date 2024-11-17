// lib\components\dashboard\DashboardWindow\DashboardBody\ListElementWindow\ListCategory.tsx

import * as React from "react"
import { ChevronDown } from "lucide-react"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "./select"
import useListStore from "@/lib/storage/state/useListStore";
import { FolderCategory, NoteCategory } from "@/lib/Interface/dashboard/DashboardWindow/DashboardBody/ListElementWindow/SearchFilter/types";
import { cn } from "@/lib/utils";


export function ListCategory() {
  const { activeTab, notesFilter, foldersFilter, setNotesFilter, setFoldersFilter } = useListStore();

  const category = activeTab === "Note" ? notesFilter.category : foldersFilter.category;

  const handleSortChange = (value: string) => {
    if (activeTab === "Folder") {
      setFoldersFilter({ category: value as FolderCategory });
    } else if (activeTab === "Note") {
      setNotesFilter({ category: value as NoteCategory });
    }
  };

  return (
    <Select 
      value={category}
      onValueChange={handleSortChange}
    >
      <SelectTrigger
      className={cn(
        "listview-filter-title relative listview-filter-title text-base font-medium gap-2 p-3 rounded-lg flex items-center w-auto",
        "data-[state=open]:listview-filter-active",
        "data-[state=closed]:listview-filter-inactive",
        "hover:listview-filter-hover"
      )}
    >
        <SelectValue placeholder="Category" className=" text-base font-medium " /> {/* Add a specific class for placeholder color */}
        <ChevronDown className="w-6 h-6 p-1 " />
      </SelectTrigger>
      <SelectContent className="mt-3 listview-filter-panel">
        <SelectGroup >
          <SelectItem value="all">All</SelectItem>         
          {activeTab === 'Folder' && (
               <SelectItem value="favorite">Favorite</SelectItem>
            )}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
