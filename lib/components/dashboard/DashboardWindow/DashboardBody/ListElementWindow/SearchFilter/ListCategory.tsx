// lib\components\dashboard\DashboardWindow\DashboardBody\ListElementWindow\ListCategory.tsx

import * as React from "react"
import { ChevronDown } from "lucide-react"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "./select"
import useListStore from "@/lib/storage/state/useListStore";
import { FolderCategory, NoteCategory } from "@/lib/Interface/dashboard/DashboardWindow/DashboardBody/ListElementWindow/SearchFilter/types";


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
      <SelectTrigger className="relative text-white text-base font-medium gap-2 p-3 bg-[#e2e2e2]/10 rounded-lg flex items-center w-auto">
        <SelectValue placeholder="Category" className=" text-base font-medium " /> {/* Add a specific class for placeholder color */}
        <ChevronDown className="w-6 h-6 p-1 " />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="all">All</SelectItem>         
          {activeTab === 'Folder' && (
               <SelectItem value="favorite">Favorite</SelectItem>
            )}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
