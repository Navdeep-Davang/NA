// lib\services\dashboard\DashboardWindow\DashboardBody\ListElementWindow\ContentView\fetchListContent.ts

import useListStore from '@/lib/storage/state/useListStore';
import { Note, Folder } from '@/lib/Interface/dashboard/DashboardWindow/DashboardBody/ListElementWindow/ContentView/types';
import { FolderFilterState, NoteFilterState } from '@/lib/Interface/dashboard/DashboardWindow/DashboardBody/ListElementWindow/SearchFilter/types';

interface FetchListContentParams {
  type: 'Note' | 'Folder';
  filter: NoteFilterState | FolderFilterState;
}


export const fetchListContent = async ({ type, filter }: FetchListContentParams): Promise<Note[] | Folder[]> => {
  const {  setLoadingNotes, setLoadingFolders, notesData, foldersData, notesFilter, foldersFilter, setNotesData, setFoldersData, lastNoteFilter, lastFolderFilter, setLastNoteFilter, setLastFolderFilter } = useListStore.getState();
  

console.log("S1 Current notesFilter:", JSON.stringify(notesFilter));
console.log("S2 Current foldersFilter:", JSON.stringify(foldersFilter));

  // Loading states for notes and folders
  const setLoading = type === 'Note' ? setLoadingNotes : setLoadingFolders;
  setLoading(true);
  console.log(`S3 ${type} loading state set to true`);

  try {
    // Get the existing data and last filter for the specified type
    const existingData = type === 'Note' ? notesData : foldersData;
    const lastFilter = type === 'Note' ? lastNoteFilter : lastFolderFilter;

    // Skip fetch if the filter hasn't changed and we already have data
    if (JSON.stringify(filter) === JSON.stringify(lastFilter) && existingData.length > 0) {
      console.log(`S4 ${type} filter unchanged, returning existing data.`);
      setLoading(false); // Stop loading
      console.log(`S5 ${type} loading state set to false`);
      return existingData;
    }

    // Perform API request to fetch data
    const response = await fetch(`/api/list/data`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type, filter }),
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch ${type} data`);
    }

    const data = (await response.json()) as Note[] | Folder[];

    // Update Zustand state with the fetched data
    if (type === 'Note') {
      setNotesData(data as Note[]);
      setLastNoteFilter(filter as NoteFilterState);
      
    } else {
      setFoldersData(data as Folder[]);
      setLastFolderFilter(filter as FolderFilterState);      
    }

    setLoading(false); // Stop loading
   
    return data;

  } catch (error) {
    // Log error and ensure loading state is stopped
    setLoading(false); // Stop loading
    
    throw error;
  }
  
};


