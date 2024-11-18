// lib\components\dashboard\DashboardWindow\DashboardBody\ListElementWindow\ContentView\ListView\index.tsx

import { Table, TableBody, TableCell, TableHeader, TableRow } from "@/components/ui/table";
import useListStore from "@/lib/storage/state/useListStore";
import FolderIcon from "@/lib/components/dashboard/svg/FolderIcon";
import FavoriteToggler from "./FavoriteToggler";
import { FilePenLine } from "lucide-react";
import NoteListSkeleton from "./NoteListSkeleton";
import FolderListSkeleton from "./FolderListSkeleton";

interface ListViewProps {
  showNoteSkeleton: boolean;
  showFolderSkeleton: boolean;
}

const ListView: React.FC<ListViewProps>= ({ showNoteSkeleton, showFolderSkeleton }) => {
  
  const { loading, activeTab, notesData, foldersData } = useListStore();  

  return (
    <div>
      {loading ? (
        <NoteListSkeleton />
      ) : (
        <div>
          {activeTab === "Note" ? (
            showNoteSkeleton ? (
              <NoteListSkeleton /> // Show skeleton if loading notes
            ) : (
              <div>
                {/* Render Table for notes */}
                <Table>
                <TableHeader >
                  <TableRow>
                    <TableCell className="list-table-header-text">Note Title</TableCell>
                    <TableCell className="list-table-header-text">Date Created</TableCell>
                    <TableCell className="list-table-header-text">Last Updated</TableCell>
                    <TableCell className="list-table-header-text">Actions</TableCell>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {notesData.map((note, index) => (
                    <TableRow key={index} className=" hover:listview-list-hover  border-none rounded-lg overflow-hidden transition duration-300 ease-in-out">
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <img className="w-24 h-20 rounded-lg" src={note.imageUrl} alt={note.title} />
                          <span className="list-item-text text-lg font-medium">{note.title}</span>
                        </div>
                      </TableCell>
                      <TableCell className="list-item-text text-lg font-medium">{note.dateCreated}</TableCell>
                      <TableCell className="list-item-text text-lg font-medium">{note.lastUpdated}</TableCell>
                      <TableCell>
                      <div className="flex gap-2"> 
      
                      <div className="p-2 rounded-lg cursor-pointer hover:listview-list-icon-hover hover:transition-colors">
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
              </div>
            )
          ) : null}
  
          {activeTab === "Folder" ? (
            showFolderSkeleton ? (
              <FolderListSkeleton /> // Show skeleton if loading folders
            ) : (
              <div>
                {/* Render Table for folders */}
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
                  {foldersData.map((folder, index) => (
                    
                    <TableRow key={index} className=" hover:listview-list-hover  border-none rounded-lg overflow-hidden transition duration-300 ease-in-out  ">
                      <TableCell className="p-5">
                        <div className="flex items-center gap-2">
                          <div className="FolderIcon w-16 h-12 p-2 flex-col justify-start items-start gap-2.5 inline-flex">
                            <div className="Group14 self-stretch grow shrink basis-0 relative">
                              <FolderIcon/>
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

                          <div className="p-2 rounded-lg hover:listview-list-icon-hover cursor-pointer">
                            <FavoriteToggler
                              category={folder.category} // Pass the category to the toggler
                              // onToggle={() => handleToggle(folder.name)} // Pass the toggle function
                            />
                          </div>                          

                          <div className="p-2 rounded-lg hover:listview-list-icon-hover cursor-pointer">
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
              </div>
            )
          ) : null}
        </div>
      )}
    </div>
  );
};

export default ListView;
