// lib\components\dashboard\DashboardWindow\DashboardBody\ListElementWindow\ListSortBy.tsx

"use client"

import { ArrowDownNarrowWide, ArrowUpWideNarrow } from "lucide-react";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "./select";
import { useEffect, useState } from "react";

interface ListSortByProp {
  activeTab: 'Note' | 'Folder';
}

export function ListSortBy({ activeTab }: ListSortByProp) {
  const [ascending, setAscending] = useState(true);
  const [sortOption, setSortOption] = useState("last-updated");


  const toggleSort = () => {
    setAscending(!ascending);
  };

  useEffect(() => {
    // Check if current sort option is valid for the active tab
    if (activeTab === "Note" && sortOption === "file-count") {
      // Reset to default "last-updated" if the current sort option is invalid for notes
      setSortOption("last-updated");
    }
    // Add other conditions here if there are more restrictions per tab
  }, [activeTab, sortOption]);


  return (
    <div className="flex items-center text-white text-base font-medium gap-2 p-3 bg-[#e2e2e2]/10 rounded-lg">
      <Select 
        value={sortOption}
        onValueChange={(value) => setSortOption(value)}
      >
        <SelectTrigger className="w-auto flex items-center whitespace-nowrap flex-shrink-0 text-ellipsis">
          <SelectValue placeholder="Sort By" className="text-base font-medium" />
        </SelectTrigger>
        <SelectContent className="mt-3" >
          <SelectGroup>
            <SelectItem value="last-updated">Last Updated</SelectItem>
            <SelectItem value="date-created">Date Created</SelectItem>
            <SelectItem value="name">Name</SelectItem>
            {activeTab === 'Folder' && (
              <SelectItem value="file-count">File Count</SelectItem>
            )}
          </SelectGroup>
        </SelectContent>
      </Select>
      <div
        className="w-6 h-6 cursor-pointer p-0.5 rounded hover:bg-[#ffffff]/20"
        onClick={toggleSort}
      >
        {ascending ? (
          <ArrowDownNarrowWide className="w-full h-full transition-opacity duration-300 opacity-100 fade-in" />
        ) : (
          <ArrowUpWideNarrow className="w-full h-full transition-opacity duration-300 opacity-100 fade-in" />
        )}
      </div>
    </div>
  );
}
