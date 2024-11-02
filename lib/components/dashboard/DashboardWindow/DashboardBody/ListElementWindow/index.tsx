// lib/components/dashboard/DashboardBody/ListElementWindow/index.tsx
import { Button } from '@/components/ui/button';
import React, { useState } from 'react';
import SearchFilter from './SearchFilter';
import TabToggle from './TabToggle';
import ContentView from './ContentView';

const ListElementWindow = React.memo(() => {
 

  // State for view toggle (Grid/List)
  const [viewMode, setViewMode] = useState<'Grid' | 'List'>('List');

  return (
    <div className="ListElementWindow w-full flex flex-col rounded-lg p-8 bg-[#262626] gap-10">
      {/* Tab Toggle */}
      <TabToggle />
      
      {/* Search & Filter */}
      <SearchFilter viewMode={viewMode} setViewMode={setViewMode} />
      
      {/* Content - Toggled between Grid and List */}
      <ContentView viewMode={viewMode} />
      
      {/* Pagination */}
      <Pagination />
    </div>
  );
});

// Pagination Component (ShadCN Pagination)
const Pagination = () => {
  return (
    <div className="Pagination flex justify-center items-center">
      <Button variant="outline">Previous</Button>
      <Button variant="outline">Next</Button>
    </div>
  );
};

export default ListElementWindow;
