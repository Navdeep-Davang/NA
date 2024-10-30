// lib/components/dashboard/DashboardWindow/DashboardBody/ListElementWindow/ContentView/ListView/index.tsx

import { Table, TableBody, TableCell, TableHeader, TableRow } from "@/components/ui/table";
import { FilePenLine } from "lucide-react";
import * as React from "react";
import FavoriteToggler from "./FavoriteToggler";


interface ListViewProps {
  activeTab: 'Note' | 'Folder';
}

interface Folder {
  name: string;
  fileCount: string;
  lastUpdated: string;
  dateCreated: string;
  category: "Favorite" | "All";
}

const ListView: React.FC<ListViewProps> = ({ activeTab }) => {
  const notes = [
    {
      title: 'Code Review',
      created: '9 min ago',
      lastUpdated: '9 min ago',
      imageUrl: 'https://via.placeholder.com/100x80',
    },
    // Additional notes...
  ];

  const initialFolders: Folder[] = [
    {
      name: 'Folder Name',
      fileCount: '9 Files',
      lastUpdated: '9 min ago',
      dateCreated: '9 min ago',
      category: 'Favorite',
    },
    {
      name: 'Another Folder',
      fileCount: '5 Files',
      lastUpdated: '10 min ago',
      dateCreated: '10 min ago',
      category: 'All',
    },
  ];

  const [folders, setFolders] = React.useState<Folder[]>(initialFolders);

  const handleToggle = (folderName: string) => {
    setFolders((prevFolders) =>
      prevFolders.map((folder) =>
        folder.name === folderName
          ? {
              ...folder,
              category: folder.category === "Favorite" ? "All" : "Favorite",
            }
          : folder
      )
    );
  };
  

  return (
    <div>
      {/* Group for Notes */}
      {activeTab === 'Note' && (
        <Table>
          <TableHeader >
            <TableRow>
              <TableCell className="list-table-header-text">Note Title</TableCell>
              <TableCell className="list-table-header-text">Created</TableCell>
              <TableCell className="list-table-header-text">Last Updated</TableCell>
              <TableCell className="list-table-header-text">Actions</TableCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {notes.map((note, index) => (
              <TableRow key={index}>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <img className="w-24 h-20 rounded-lg" src={note.imageUrl} alt={note.title} />
                    <span className="text-white text-xl font-medium">{note.title}</span>
                  </div>
                </TableCell>
                <TableCell className="text-white">{note.created}</TableCell>
                <TableCell className="text-white">{note.lastUpdated}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <div className="FavoriteSelectedIcon w-9 h-9 p-1 justify-center items-center flex" />
                    <div className="MoreVert w-9 h-9 py-1.5 justify-center items-center flex" />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}

      {/* Group for Folders */}
      {activeTab === 'Folder' && (
        <Table>
          <TableHeader>
            <TableRow>
              <TableCell className="list-table-header-text">Folder Name</TableCell>
              <TableCell className="list-table-header-text">Files</TableCell>
              <TableCell className="list-table-header-text">Date Created</TableCell>
              <TableCell className="list-table-header-text">Last Updated</TableCell>
              <TableCell className="list-table-header-text">Actions</TableCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {folders.map((folder, index) => (
              
              <TableRow key={index}>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <div className="FolderIcon w-16 h-12 p-2 flex-col justify-start items-start gap-2.5 inline-flex">
                      <div className="Group14 self-stretch grow shrink basis-0 relative">
                        {/* Include folder icon SVG or image here */}
                      </div>
                    </div>
                    <span className="list-item-text text-lg font-medium">{folder.name}</span>
                  </div>
                </TableCell>
                <TableCell className="list-item-text text-lg font-medium">{folder.fileCount}</TableCell>
                <TableCell className="list-item-text text-lg font-medium">{folder.dateCreated}</TableCell>
                <TableCell className="list-item-text text-lg font-medium">{folder.lastUpdated}</TableCell>
                <TableCell>
             <div className="flex gap-2">
                <FavoriteToggler
                  category={folder.category} // Pass the category to the toggler
                  onToggle={() => handleToggle(folder.name)} // Pass the toggle function
                />

              <div className="p-1 rounded-lg hover:bg-[#ffffff]/10 cursor-pointer">
              <FilePenLine
                width="24"
                height="24"
                className="list-item-text"
              />
            </div>

            </div>
          </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}      
    </div>
  );
};

export default ListView;
