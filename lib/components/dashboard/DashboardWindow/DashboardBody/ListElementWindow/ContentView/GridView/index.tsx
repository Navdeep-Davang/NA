// lib/components/dashboard/DashboardWindow/DashboardBody/ListElementWindow/ContentView/GridView/index.tsx

import { Card } from "@/components/ui/card";
import useListStore from "@/lib/storage/state/useListStore";
import NoteListSkeleton from "../ListView/NoteListSkeleton";
import { MoreVertical } from "lucide-react";
import FolderIcon from "@/lib/components/dashboard/svg/FolderIcon";
import { useEffect, useState } from "react";
import NoteGridSkeleton from "./NoteGridSkeleton";
import FolderGridSkeleton from "./FolderGridskeleton";


// Define the GridViewProps interface

interface GridViewProps {
  showNoteSkeleton: boolean;
  showFolderSkeleton: boolean;
}


const GridView: React.FC<GridViewProps> = ({ showNoteSkeleton, showFolderSkeleton }) => {
  const { loading, activeTab, notesData, foldersData } = useListStore();
  const [columnCount, setColumnCount] = useState(6);


  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width >= 1280) {
        const additionalColumns = Math.floor((width - 1280) / 300);
        const newColumnCount = 4 + additionalColumns;
        setColumnCount(Math.min(newColumnCount, 9)); // Change 10 to 12
      } else {
        setColumnCount(5); // Reset to 4 for widths less than 1280
      }
    };
  
    handleResize(); // Set initial column count
    window.addEventListener('resize', handleResize); // Update on resize
  
    return () => {
      window.removeEventListener('resize', handleResize); // Cleanup
    };
  }, []);
  
  return (
    <div>
      {loading ? (
       <NoteListSkeleton />
      ) : (
        <div>
          {activeTab === "Note" ? (
            // When the active tab is Notes
            showNoteSkeleton ? (
              <NoteGridSkeleton columnCount= {columnCount} /> // Show skeleton if loading notes
            ) : (
              <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-${columnCount} gap-8`}>
                {notesData.map((note, index) => (
                  <Card
                    key={index}
                    className="border-transparent p-4 bg-white/10 hover:bg-white/20 hover:border-white/50 rounded-lg flex flex-col justify-start items-center gap-4 transition-colors duration-300 ease-in-out"
                  >
                    <div className="self-stretch h-40 rounded-lg flex justify-center items-center">
                      <img
                        className="self-stretch grow shrink rounded-lg"
                        src={note.imageUrl || "https://via.placeholder.com/228x160"}
                        alt={note.title}
                      />
                    </div>
                    <div className="self-stretch flex justify-between items-center">
                      <div className="pl-2 flex flex-col justify-start items-start gap-1 flex-grow">
                        <div className="text-white text-lg font-medium">
                          {note.title}
                        </div>
                        <div className="text-[#dedede] text-base font-normal leading-normal tracking-tight">
                          {note.lastUpdated}
                        </div>
                      </div>
                      <div className="py-1.5 rounded-lg hover:bg-white/20 transition-colors duration-300 ease-in-out flex justify-center items-center">
                        <MoreVertical className="text-[#dedede] w-8 h-8 " />
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )
          ) : null}
  
          {activeTab === "Folder" ? (
            // When the active tab is Folders
            showFolderSkeleton ? (
              <FolderGridSkeleton columnCount= {columnCount} /> // Show skeleton if loading folders
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
