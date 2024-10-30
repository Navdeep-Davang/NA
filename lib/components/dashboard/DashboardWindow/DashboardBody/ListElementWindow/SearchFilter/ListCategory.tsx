// lib\components\dashboard\DashboardWindow\DashboardBody\ListElementWindow\ListCategory.tsx

import * as React from "react"
import { ChevronDown } from "lucide-react"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "./select"


export function ListCategory() {
  return (
    <Select defaultValue="all">
      <SelectTrigger className="relative text-white text-base font-medium gap-2 p-3 bg-[#e2e2e2]/10 rounded-lg flex items-center w-auto">
        <SelectValue placeholder="Category" className=" text-base font-medium " /> {/* Add a specific class for placeholder color */}
        <ChevronDown className="w-6 h-6 p-1 " />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="all">All</SelectItem>
          <SelectItem value="favorite">Favorite</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
