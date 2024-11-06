// lib\components\dashboard\DashboardWindow\DashboardBody\ListElementWindow\PaginationBar\index.tsx

import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "@/components/ui/pagination";
import useListStore from "@/lib/storage/state/useListStore";
import { PaginationBarSkeleton } from './Skeleton';

export function PaginationBar() {
  const { loading , activeTab, notePage, folderPage, setNotePage, setFolderPage } = useListStore();

  if (loading) {
    return <PaginationBarSkeleton />; // You could replace this with a spinner or skeleton
  }

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) return;
    if (activeTab === 'Note') {
      setNotePage(newPage);
    } else {
      setFolderPage(newPage);
    }
  };

  const currentPage = activeTab === 'Note' ? notePage : folderPage;

  // Define the maximum pages (assuming for the example, replace with actual data)
  const totalPages = 20; // Replace with actual maximum page count from your data
  const maxDisplayedPages = 5; // Number of pages to display at once

  const startPage = Math.floor((currentPage - 1) / maxDisplayedPages) * maxDisplayedPages + 1;
  const endPage = Math.min(startPage + maxDisplayedPages - 1, totalPages);

  // Move to the same offset in the next range
  const handleNextRange = () => {
    const offsetInRange = currentPage - startPage;
    const nextRangePage = startPage + maxDisplayedPages + offsetInRange;
    handlePageChange(Math.min(nextRangePage, totalPages));
  };

  // Move to the same offset in the previous range
  const handlePreviousRange = () => {
    const offsetInRange = currentPage - startPage;
    const previousRangePage = startPage - maxDisplayedPages + offsetInRange;
    handlePageChange(Math.max(previousRangePage, 1));
  };

  return (
    <Pagination>
      <PaginationContent className="flex justify-center items-center space-x-2 text-white">
        <PaginationItem>
          {startPage > 1 && (
            <div 
              className="p-1 hover:bg-white/20 rounded-lg cursor-pointer"
              onClick={handlePreviousRange}
            >
              <ChevronsLeft width={24} />
            </div>
          )}
        </PaginationItem>
        <PaginationItem>
          {currentPage > 1 && (
            <div 
              className="p-1 hover:bg-white/20 rounded-lg cursor-pointer"
              onClick={() => handlePageChange(currentPage - 1)}
            >
              <ChevronLeft width={24} />
            </div>
          )}
        </PaginationItem>

        {/* Dynamically render pagination links */}
        {Array.from({ length: endPage - startPage + 1 }, (_, index) => startPage + index).map((page) => (
          <PaginationItem key={page}>
            <button
              onClick={() => handlePageChange(page)}
              className={`px-2 py-1 rounded ${page === currentPage ? "bg-white text-black" : "hover:bg-white/20 hover:text-white"}`}
              aria-current={page === currentPage ? "page" : undefined}
            >
              {page}
            </button>
          </PaginationItem>
        ))}

        <PaginationItem>
          {currentPage < totalPages && (
            <div 
              className="p-1 hover:bg-white/20 rounded-lg cursor-pointer"
              onClick={() => handlePageChange(currentPage + 1)}
            >
              <ChevronRight width={24} />
            </div>
          )}
        </PaginationItem>
        <PaginationItem>
          {endPage < totalPages && (
            <div 
              className="p-1 hover:bg-white/20 rounded-lg cursor-pointer"
              onClick={handleNextRange}
            >
              <ChevronsRight width={24} />
            </div>
          )}
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
