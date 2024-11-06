// lib/components/dashboard/DashboardBody/ListElementWindow/index.tsx
import { Button } from '@/components/ui/button';
import React, { useState } from 'react';
import SearchFilter from './SearchFilter';
import TabToggle from './TabToggle';
import ContentView from './ContentView';
import { PaginationBar } from './PaginationBar';

const ListElementWindow = React.memo(() => {
 

  return (
    <div className="ListElementWindow w-full flex flex-col rounded-lg p-8 bg-[#262626] gap-10">
      {/* Tab Toggle */}
      <TabToggle />
      
      {/* Search & Filter */}
      <SearchFilter/>
      
      {/* Content - Toggled between Grid and List */}
      <ContentView/>
      
      {/* Pagination */}
      <PaginationBar />
    </div>
  );
});



export default ListElementWindow;
