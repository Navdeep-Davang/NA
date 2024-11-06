// lib\services\dashboard\DashboardWindow\DashboardBody\ListElementWindow\ContentView\fetchListContent.ts

import useListStore from '@/lib/storage/state/useListStore';
import { Note, Folder } from '@/lib/Interface/dashboard/DashboardWindow/DashboardBody/ListElementWindow/ContentView/types';
import { FolderFilterState, NoteFilterState } from '@/lib/Interface/dashboard/DashboardWindow/DashboardBody/ListElementWindow/SearchFilter/types';

interface FetchListContentParams {
  type: 'Note' | 'Folder';
  filter: NoteFilterState | FolderFilterState;
}


export const fetchListContent = async ({ type, filter }: FetchListContentParams): Promise<Note[] | Folder[]> => {
  const { loadingNotes, loadingFolders, setLoadingNotes, setLoadingFolders, notesData, foldersData, notesFilter, foldersFilter, setNotesData, setFoldersData, lastNoteFilter, lastFolderFilter, setLastNoteFilter, setLastFolderFilter } = useListStore.getState();
  

console.log("S1 Current notesFilter:", JSON.stringify(notesFilter));
console.log("S2 Current foldersFilter:", JSON.stringify(foldersFilter));
console.log("S3 Loading Notes:",JSON.stringify(loadingNotes));
console.log("S4 Loading Folders:",  JSON.stringify(loadingFolders));

  // Loading states for notes and folders
  const setLoading = type === 'Note' ? setLoadingNotes : setLoadingFolders;
  setLoading(true);

  // Check if the filter has changed
  const existingData = type === 'Note' ? notesData : foldersData;
  const lastFilter = type === 'Note' ? lastNoteFilter : lastFolderFilter;

  if (JSON.stringify(filter) === JSON.stringify(lastFilter) && existingData.length > 0) {
    setLoading(false); // Reset loading state if no fetch is needed
    console.log("S5.0 Didnt hit the API retuning the existing data");
    console.log("---------------------------------------------------------------");
    return existingData;
  }

  // Make an API request if the filter has changed
  try {
    const response = await fetch(`/api/list/data`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type, filter }),
    });

    console.log("S5.1  HIT the API retuning the existing data");
    console.log("---------------------------------------------------------------");

    if (!response.ok) {
      throw new Error(`Failed to fetch ${type} data`);
    }

    const data = await response.json() as Note[] | Folder[];

    // Store fetched data in Zustand for future use
    if (type === 'Note') {
      setNotesData(data as Note[]);
      
      setLastNoteFilter(filter as NoteFilterState); // Update the last filter for notes
    } else {
      setFoldersData(data as Folder[]);
      
      setLastFolderFilter(filter as FolderFilterState); // Update the last filter for folders
    }

    setLoading(false);
    return data;

  } catch (error) {
    console.error(`Error fetching ${type} content:`, error);
    setLoading(false);
    throw error;
  }
  
};


