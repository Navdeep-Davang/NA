// lib/components/dashboard/DashboardWindow/DashboardBody/ListElementWindow/ContentView/GridView/index.tsx

import { Card, CardContent, CardTitle } from "@/components/ui/card";
import * as React from "react";

// Define the GridViewProps interface
interface GridViewProps {
  activeTab: 'Note' | 'Folder';
}

const GridView: React.FC<GridViewProps> = ({ activeTab }) => {
  const notes = [
    {
      title: 'Code Review',
      edited: 'Edited 9 min ago',
      imageUrl: 'https://via.placeholder.com/276x160',
    },
    // Add more note objects as needed
  ];

  const folders = [
    {
      title: 'Folder Name',
      fileCount: '9 Files',
      // Add folder icon data if needed
    },
    // Add more folder objects as needed
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {activeTab === 'Note' && (
        <div className="grid grid-cols-1 gap-4">
          {notes.map((note, index) => (
            <Card key={index} className="min-w-[240px] max-w-[300px] w-72 h-64 p-3 bg-white/10 rounded-lg flex-col justify-start items-center gap-6 inline-flex">
              <CardContent className="h-40 rounded-lg flex-col justify-center items-center flex">
                <img className="self-stretch grow shrink basis-0 rounded-lg" src={note.imageUrl} alt={note.title} />
              </CardContent>
              <CardContent className="self-stretch justify-between items-center inline-flex">
                <div className="Text w-36 flex-col justify-start items-start gap-2 inline-flex">
                  <CardTitle className="self-stretch text-white text-xl font-semibold tracking-tight">{note.title}</CardTitle>
                  <div className="Edited9minAgo text-[#dedede] text-base font-normal leading-normal tracking-tight">{note.edited}</div>
                </div>
                <div className="MoreVert w-8 h-8 py-1.5 rounded-lg justify-center items-center flex" />
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {activeTab === 'Folder' && (
        <div className="grid grid-cols-1 gap-4">
          {folders.map((folder, index) => (
            <Card key={index} className="min-w-[240px] max-w-[300px] w-60 h-64 p-3 bg-white/20 rounded-lg flex-col justify-start items-center gap-6 inline-flex">
              <CardContent className="self-stretch h-40 rounded-lg flex-col justify-center items-center flex">
                <div className="FolderIcon self-stretch grow shrink basis-0 p-2 bg-white/50 rounded-lg flex-col justify-center items-center gap-2.5 flex">
                  <div className="Group14 w-36 h-24 relative" />
                </div>
              </CardContent>
              <CardContent className="self-stretch justify-between items-center inline-flex">
                <div className="Text w-36 flex-col justify-start items-start gap-2 inline-flex">
                  <CardTitle className="self-stretch text-white text-xl font-semibold tracking-tight">{folder.title}</CardTitle>
                  <div className="File text-[#dedede] text-base font-normal leading-normal tracking-tight">{folder.fileCount}</div>
                </div>
                <div className="MoreVert w-8 h-8 py-1.5 rounded-lg justify-center items-center flex" />
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default GridView;
