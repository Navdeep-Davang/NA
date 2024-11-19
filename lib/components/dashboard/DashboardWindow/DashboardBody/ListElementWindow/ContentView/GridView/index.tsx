// lib/components/dashboard/DashboardWindow/DashboardBody/ListElementWindow/ContentView/GridView/index.tsx

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import useListStore from "@/lib/storage/state/useListStore";
import NoteListSkeleton from "../ListView/NoteListSkeleton";
import { History, MoreVertical } from "lucide-react";
import FolderIcon from "@/lib/components/dashboard/svg/FolderIcon";
import { useEffect, useRef, useState } from "react";
import NoteGridSkeleton from "./NoteGridSkeleton";
import FolderGridSkeleton from "./FolderGridskeleton";


// Define the GridViewProps interface

interface GridViewProps {
  showNoteSkeleton: boolean;
  showFolderSkeleton: boolean;
}


const GridView: React.FC<GridViewProps> = ({ showNoteSkeleton, showFolderSkeleton }) => {
  const { loading, activeTab, notesData, foldersData } = useListStore();
  const [columnCount, setColumnCount] = useState<number | null>(null);
  const parentContainerRef = useRef<HTMLDivElement>(null);
  const [keepSkeleton, setKeepSkeleton] = useState(true); // Initially true


  const updateColumnCount = () => {
    if (parentContainerRef.current) {
      const gridWidth = parentContainerRef.current.offsetWidth;
      console.log("Parent Container Width:", gridWidth);
      
      // Check if width is available
      if (gridWidth > 0) {
        setKeepSkeleton(false); // Set keepSkeleton to false when width is available
      }
      
      const itemWidth = 220; // Adjust this value to change the minimum width of grid items
      const gap = 24; // This should match the gap in your grid CSS
      const newColumnCount = Math.floor((gridWidth + gap) / (itemWidth + gap));
      setColumnCount(Math.max(1, Math.min(newColumnCount, 9))); // Ensure at least 1 column and cap at 9
    }
  };



  const checkWidthOnLoad = () => {
    const intervalId = setInterval(() => {
      // Ensure parentContainerRef.current is not null before accessing offsetWidth
    
      if (parentContainerRef.current && parentContainerRef.current.offsetWidth > 0) {
        clearInterval(intervalId); // Stop polling once valid width is available
        updateColumnCount(); // Update column count based on the valid width
      }
    }, 100); // Poll every 100ms to check for valid width
  };



  useEffect(() => {
    if (!parentContainerRef.current?.offsetWidth) {
      checkWidthOnLoad();
    }
  }, []);


  useEffect(() => { 

    // Use ResizeObserver to dynamically update column count on resizing
    const resizeObserver = new ResizeObserver(updateColumnCount);
    if (parentContainerRef.current) {
      resizeObserver.observe(parentContainerRef.current);
    }

    // Cleanup observers on component unmount
    return () => {
      if (parentContainerRef.current) {
        resizeObserver.unobserve(parentContainerRef.current);
      }
    };
  }, [keepSkeleton]);
  



  useEffect(() => {
    console.log(`GridView: Updated columnCount: ${columnCount}`);
  }, []);
  
  return (
    <div>
      {loading ? (
       <NoteListSkeleton />
      ) : (
        <div>
          {activeTab === "Note" ? (
            // When the active tab is Notes
            showNoteSkeleton || keepSkeleton ? (
              <NoteGridSkeleton columnCount= {columnCount ?? 3} /> // Show skeleton if loading notes
            ) : (
              
            <div
              ref={parentContainerRef}
              className="grid gap-6"
              style={{
                gridTemplateColumns: `repeat(${columnCount}, minmax(0, 1fr))`,
              }}
            >
              {notesData.map((note) => (
                <Card key={note.id} className="group flex flex-col theme-card-background theme-card-border theme-card-shadow-hover">
                  <CardHeader>
                    <img className="w-full h-full rounded-lg object-cover" src={note.imageUrl} alt={note.title} />
                  </CardHeader>
                  <CardContent className="pb-4 pl-6 pr-6 pt-0">
                    <CardTitle className="text-lg theme-card-title">{note.title}</CardTitle>
                    <div className="flex justify-between mt-1 items-center text-base">
                      <div className="theme-card-text flex items-center space-x-2">
                        <History className="w-4 h-4" />
                        <span>{note.lastUpdated}</span>
                      </div>
                      <div className="p-1 rounded-lg theme-card-icon-hover opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <MoreVertical className="w-6 h-6 theme-card-icon" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            )
          ) : null}
  
          {activeTab === "Folder" ? (
            // When the active tab is Folders
            showFolderSkeleton || keepSkeleton ? (
              <FolderGridSkeleton columnCount= {columnCount ?? 3} /> // Show skeleton if loading folders
            ) : (
              <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-${columnCount} gap-8`}>
                {foldersData.map((folder, index) => (
                  // Render grid cards for folders here
                  <Card
                    key={index}
                    className="border-transparent p-4 bg-white/10 hover:bg-white/20 hover:border-white/50 rounded-lg flex flex-col justify-start items-center gap-4 transition-colors duration-300 ease-in-out"
                  >
                    <div className="Image w-full h-40 rounded-lg flex-col justify-center items-center inline-flex">
                      <div className="w-full h-40 p-2 bg-white/50 rounded-lg flex-col justify-center items-center gap-2.5 flex"> 
                        <FolderIcon width={140} /> {/* Folder icon replaces the note image */}
                      </div>
                    </div>
                    <div className="self-stretch flex justify-between items-center">
                      <div className="pl-2 flex flex-col justify-start items-start gap-1 flex-grow">
                        <div className="text-white text-lg font-medium">
                          {folder.name} {/* Assuming folder has a title */}
                        </div>
                        <div className="text-[#dedede] text-base font-normal leading-normal tracking-tight">
                          {folder.fileCount} {/* Display file count for folders */}
                        </div>
                      </div>
                      <div className="py-1.5 rounded-lg hover:bg-white/20 transition-colors duration-300 ease-in-out flex justify-center items-center">
                        <MoreVertical className="text-[#dedede] w-8 h-8 " /> {/* Lucide More icon */}
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )
          ) : null}
        </div>
      )}
    </div>
  );
  
};

export default GridView;
