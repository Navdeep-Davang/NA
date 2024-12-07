// lib/components/dashboard/DashboardWindow/DashboardBody/ListElementWindow/ContentView/GridView/index.tsx

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import useListStore from "@/lib/storage/state/useListStore";
import NoteListSkeleton from "../ListView/NoteListSkeleton";
import { History, MoreVertical } from "lucide-react";
import FolderIcon from "@/lib/components/dashboard/svg/FolderIcon";
import { useEffect, useRef, useState } from "react";
import NoteGridSkeleton from "./NoteGridSkeleton";
import FolderGridSkeleton from "./FolderGridskeleton";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { MoreIcon } from "@/lib/components/dashboard/svg";
import { MoreOptionPanel } from "@/lib/components/dashboard/Sidebar/MoreOptionPanel";


// Define the GridViewProps interface

interface GridViewProps {
  showNoteSkeleton: boolean;
  showFolderSkeleton: boolean;
}


const GridView: React.FC<GridViewProps> = ({ showNoteSkeleton, showFolderSkeleton }) => {
  const { loading, activeTab, notesData, foldersData } = useListStore();
  const [columnCount, setColumnCount] = useState<number>(3);
  const [keepSkeleton, setKeepSkeleton] = useState(true);
  const parentContainerRef = useRef<HTMLDivElement>(null);
  

  const updateColumnCount = () => {
    if (parentContainerRef.current) {
      const gridWidth = parentContainerRef.current.offsetWidth;
      
      
      if (gridWidth > 0) {
        const itemWidth = 220; // Adjust this value to change the minimum width of grid items
        const gap = 24; // This should match the gap in your grid CSS
        const newColumnCount = Math.floor((gridWidth + gap) / (itemWidth + gap));
        setColumnCount(Math.max(1, Math.min(newColumnCount, 9)));
        setKeepSkeleton(false); // Set keepSkeleton to false when width is available
      }
           
    }
  };
  

  useEffect(() => {
    updateColumnCount();
    window.addEventListener('resize', updateColumnCount);
    
    return () => window.removeEventListener('resize', updateColumnCount);
  }, []);
  


  
  return (
    <div ref={parentContainerRef}>
      {loading || keepSkeleton ? (
       <NoteListSkeleton />
      ) : (
        <div>
          {activeTab === "Note" ? (
            // When the active tab is Notes
            showNoteSkeleton  ? (
              <NoteGridSkeleton  columnCount= {columnCount} /> // Show skeleton if loading notes
            ) : (
              
            <div
              
              className="grid gap-6"
              style={{
                gridTemplateColumns: `repeat(${columnCount}, minmax(0, 1fr))`,
              }}
            >
              {notesData.map((note) => (
                <Card key={note.id} className="group flex flex-col gap-4 theme-card-background theme-card-border theme-card-shadow-hover">
                  <CardHeader className="p-6 pb-0">
                    <img className="w-full h-full rounded-lg object-cover" src={note.imageUrl} alt={note.title} />
                  </CardHeader>
                  <CardContent className="pb-4 pl-6 pr-6 pt-0">
                    <CardTitle className="text-lg theme-card-title">{note.title}</CardTitle>
                    <div className="flex justify-between mt-1 items-center text-base">
                      <div className="theme-card-text flex items-center space-x-2">
                        <History className="w-4 h-4" />
                        <span>{note.lastUpdated}</span>
                      </div>
                      <Popover>
                          <PopoverTrigger asChild>
                            <div className="p-1 rounded-lg theme-card-icon-hover opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                              <MoreVertical className="w-6 h-6 theme-card-icon" />                                             
                            </div>
                          </PopoverTrigger> 
                          <PopoverContent className="p-2 more-option-panel w-auto border">
                            <MoreOptionPanel type="note" />
                          </PopoverContent>
                      </Popover>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            )
          ) : null}
  
          {activeTab === "Folder" ? (
            // When the active tab is Folders
            showFolderSkeleton  ? (
              <FolderGridSkeleton columnCount= {columnCount} /> // Show skeleton if loading folders
            ) : (
              <div
              
                className="grid gap-6"
                style={{
                  gridTemplateColumns: `repeat(${columnCount}, minmax(0, 1fr))`,
                }}
              >
              
              {foldersData.map((folder) => (
                <Card key={folder.id} className="group flex gap-4 flex-col theme-card-background theme-card-border theme-card-shadow-hover">
                  <CardHeader className="flex p-6 pb-0 justify-center items-center">
                    {/* Responsive Folder Icon */}
                    <div className="w-full listview-folder-icon-bg  flex justify-center items-center rounded-lg">
                      <FolderIcon width="60%" paddingPercentage={20}  /> {/* Adjust size relative to parent */}
                    </div>
                  </CardHeader>
                  <CardContent className="pb-4 pl-6 pr-6 pt-0">
                    <CardTitle className="text-lg theme-card-title">{folder.name}</CardTitle>
                    <div className="flex justify-between mt-1 items-center text-base">
                      <div className="theme-card-text flex items-center space-x-2">
                        <span>{folder.fileCount}</span> {/* File count displayed here */}
                      </div>
                      <Popover>
                        <PopoverTrigger asChild>
                          <div className="p-1 rounded-lg theme-card-icon-hover opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <MoreVertical className="w-6 h-6 theme-card-icon" />                                             
                          </div>
                        </PopoverTrigger> 
                        <PopoverContent className="p-2 more-option-panel w-auto border">
                          <MoreOptionPanel type="folder" isfavorite = {folder.isfavorite} />
                        </PopoverContent>
                      </Popover>                     
                    </div>
                  </CardContent>
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
