// lib\components\dashboard\DashboardWindow\DashboardBody\ListElementWindow\ContentView\index.tsx


import GridView from "./GridView";
import ListView from "./ListView";
import useListStore from "@/lib/storage/state/useListStore";
import { fetchListContent } from "@/lib/services/dashboard";
import { useEffect, useMemo, useState } from "react";



const ContentView = () => {

  const { loading, loadingNotes, loadingFolders, activeTab, viewMode, notesFilter, foldersFilter } = useListStore();
  const [showNoteSkeleton, setShowNoteSkeleton] = useState(false);
  const [showFolderSkeleton, setShowFolderSkeleton] = useState(false);

  

  const filter = useMemo(() => (activeTab === "Note" ? notesFilter : foldersFilter), [activeTab, notesFilter, foldersFilter]);

  useEffect(() => {

    if (loading) return;
    if ((activeTab === "Note" && loadingNotes) || (activeTab === "Folder" && loadingFolders)) return;
    
    const fetchData = async () => {
      try {
        await fetchListContent({ type: activeTab, filter });
        // No need to handle response as it is already done in fetchListContent
      } catch (error) {
        console.error("(ContentView) Error fetching data:", error);
        // Optionally handle error state here
      }
    };
    console.log("Entering the fetchData service")
    fetchData();
  }, [JSON.stringify(filter), loading, activeTab]);

  useEffect(() => {
    let noteTimeout: NodeJS.Timeout;
    let folderTimeout: NodeJS.Timeout;
  
    // Check loading state for notes
    if (loadingNotes) {
      setShowNoteSkeleton(true);
    } else {
      noteTimeout = setTimeout(() => setShowNoteSkeleton(false), 500);
    }
  
    // Check loading state for folders
    if (loadingFolders) {
      setShowFolderSkeleton(true);
    } else {
      folderTimeout = setTimeout(() => setShowFolderSkeleton(false), 500);
    }
    
    console.log("contentView Note loading status:", loadingNotes )
    console.log("contentView Folder loading status:", loadingFolders )
    return () => {
      clearTimeout(noteTimeout);
      clearTimeout(folderTimeout);
    };
  }, [loadingNotes, loadingFolders]); 

  return (
    <div className={`${viewMode === 'Grid' ? 'GridView' : 'ListView'} flex flex-col gap-4`}>
      {viewMode === 'List' ? (
        <ListView showNoteSkeleton={showNoteSkeleton} showFolderSkeleton={showFolderSkeleton} />
      ) : (
        <GridView showNoteSkeleton={showNoteSkeleton} showFolderSkeleton={showFolderSkeleton}/>
      )}
    </div>
  );
};

export default ContentView;
