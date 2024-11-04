// lib\services\dashboard\DashboardWindow\DashboardBody\ListElementWindow\ContentView\fetchListContent.ts

import useListStore from '@/lib/storage/state/useListStore';
import { Note, Folder } from '@/lib/Interface/dashboard/DashboardWindow/DashboardBody/ListElementWindow/ContentView/types';
import { FolderFilterState, NoteFilterState } from '@/lib/Interface/dashboard/DashboardWindow/DashboardBody/ListElementWindow/SearchFilter/types';

interface FetchListContentParams {
  type: 'Note' | 'Folder';
  filter: NoteFilterState | FolderFilterState;
}

// Local variables to keep track of the last filter state for notes and folders
let lastNoteFilter: NoteFilterState = {} as NoteFilterState; // Empty object for notes
let lastFolderFilter: FolderFilterState = {} as FolderFilterState; // Empty object for folders

export const fetchListContent = async ({ type, filter }: FetchListContentParams): Promise<Note[] | Folder[]> => {
  const { loadingNotes, loadingFolders, setLoadingNotes, setLoadingFolders, notesData, foldersData, notesFilter, foldersFilter, setNotesFilter, setFoldersFilter, setNotesData, setFoldersData } = useListStore.getState();
  

console.log("S1 Current notesFilter:", JSON.stringify(notesFilter));
console.log("S2 Current foldersFilter:", JSON.stringify(foldersFilter));
console.log("Loading Notes:",JSON.stringify(loadingNotes));
console.log("Loading Folders:",  JSON.stringify(loadingFolders));
console.log("++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++");
  // Loading states for notes and folders
  const setLoading = type === 'Note' ? setLoadingNotes : setLoadingFolders;
  setLoading(true); 

  
  // Check if the filter is non-empty and if it has changed
  const isFilterEmpty = Object.values(filter).every(value => value === undefined || value === null || value === '');
  const isFilterSameAsLast = !isFilterEmpty && JSON.stringify(filter) === JSON.stringify(type === 'Note' ? lastNoteFilter : lastFolderFilter);
  const existingData = type === 'Note' ? notesData : foldersData;

  if (isFilterSameAsLast && existingData.length > 0) {
    setLoading(false); // Reset loading state if no fetch is needed
    return existingData;
  }

  // Make an API request if the filter has changed
  try {
    const response = await fetch(`/api/list/data`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type, filter }),
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch ${type} data`);
    }

    const data = await response.json() as Note[] | Folder[];

    // Store fetched data in Zustand for future use
    if (type === 'Note') {
      setNotesData(data as Note[]);
      
      lastNoteFilter = filter as NoteFilterState; // Update the last filter for notes
    } else {
      setFoldersData(data as Folder[]);
      
      lastFolderFilter = filter as FolderFilterState; // Update the last filter for folders
    }

    setLoading(false);
    return data;

  } catch (error) {
    console.error(`Error fetching ${type} content:`, error);
    setLoading(false);
    throw error;
  }
  
};


