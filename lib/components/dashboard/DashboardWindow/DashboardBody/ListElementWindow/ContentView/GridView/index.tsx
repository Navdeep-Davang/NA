// lib/components/dashboard/DashboardWindow/DashboardBody/ListElementWindow/ContentView/GridView/index.tsx

import { Card, CardContent, CardTitle } from "@/components/ui/card";
import useListStore from "@/lib/storage/state/useListStore";
import NoteListSkeleton from "../ListView/NoteListSkeleton";
import FolderListSkeleton from "../ListView/FolderListSkeleton";


// Define the GridViewProps interface

interface GridViewProps {
  showNoteSkeleton: boolean;
  showFolderSkeleton: boolean;
}


const GridView: React.FC<GridViewProps> = ({ showNoteSkeleton, showFolderSkeleton }) => {
  const { loading, activeTab, notesData, foldersData } = useListStore();

  return (
    <div>
      {loading ? (
       <NoteListSkeleton />
      ) : (
        <div>
          {activeTab === "Note" ? (
            // When the active tab is Notes
            showNoteSkeleton ? (
              <NoteListSkeleton /> // Show skeleton if loading notes
            ) : (
              <div className="grid grid-cols-1 gap-4">
                {notesData.map((note, index) => (
                  // Render grid cards for notes here
                  <Card key={index} className="min-w-[240px] max-w-[300px] w-72 h-64 p-3 bg-white/10 rounded-lg flex-col justify-start items-center gap-6 inline-flex">
                    <CardContent className="h-40 rounded-lg flex-col justify-center items-center flex">
                      <img className="self-stretch grow shrink basis-0 rounded-lg" src={note.imageUrl} alt={note.title} />
                    </CardContent>
                    <CardContent className="self-stretch justify-between items-center inline-flex">
                      <div className="Text w-36 flex-col justify-start items-start gap-2 inline-flex">
                        <CardTitle className="self-stretch text-white text-xl font-semibold tracking-tight">{note.title}</CardTitle>
                        <div className="Edited9minAgo text-[#dedede] text-base font-normal leading-normal tracking-tight">{note.lastUpdated}</div>
                      </div>
                      <div className="MoreVert w-8 h-8 py-1.5 rounded-lg justify-center items-center flex" />
                    </CardContent>
                  </Card>
                ))}
              </div>
            )
          ) : null}
  
          {activeTab === "Folder" ? (
            // When the active tab is Folders
            showFolderSkeleton ? (
              <FolderListSkeleton /> // Show skeleton if loading folders
            ) : (
              <div className="grid grid-cols-1 gap-4">
                {foldersData.map((folder, index) => (
                  // Render grid cards for folders here
                  <Card key={index} className="min-w-[240px] max-w-[300px] w-60 h-64 p-3 bg-white/20 rounded-lg flex-col justify-start items-center gap-6 inline-flex">
                    <CardContent className="self-stretch h-40 rounded-lg flex-col justify-center items-center flex">
                      <div className="FolderIcon self-stretch grow shrink basis-0 p-2 bg-white/50 rounded-lg flex-col justify-center items-center gap-2.5 flex">
                        <div className="Group14 w-36 h-24 relative" />
                      </div>
                    </CardContent>
                    <CardContent className="self-stretch justify-between items-center inline-flex">
                      <div className="Text w-36 flex-col justify-start items-start gap-2 inline-flex">
                        <CardTitle className="self-stretch text-white text-xl font-semibold tracking-tight">{folder.name}</CardTitle>
                        <div className="File text-[#dedede] text-base font-normal leading-normal tracking-tight">{folder.fileCount}</div>
                      </div>
                      <div className="MoreVert w-8 h-8 py-1.5 rounded-lg justify-center items-center flex" />
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
