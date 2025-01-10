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
// console.log("S3 Loading Notes:",JSON.stringify(loadingNotes));
// console.log("S4 Loading Folders:",  JSON.stringify(loadingFolders));

  // Loading states for notes and folders
  const setLoading = type === 'Note' ? setLoadingNotes : setLoadingFolders;
  setLoading(true);
  console.log(`(fetchListContent) ${type} loading state set to true`);

  try {
    // Get the existing data and last filter for the specified type
    const existingData = type === 'Note' ? notesData : foldersData;
    const lastFilter = type === 'Note' ? lastNoteFilter : lastFolderFilter;

    console.log(`(fetchListContent) Current ${type} filter:`, JSON.stringify(filter));
    console.log(`(fetchListContent) Last ${type} filter:`, JSON.stringify(lastFilter));

    // Skip fetch if the filter hasn't changed and we already have data
    if (JSON.stringify(filter) === JSON.stringify(lastFilter) && existingData.length > 0) {
      console.log(`(fetchListContent) ${type} filter unchanged, returning existing data.`);
      setLoading(false); // Stop loading
      console.log(`(fetchListContent) ${type} loading state set to false`);
      return existingData;
    }

    // Perform API request to fetch data
    console.log(`(fetchListContent) Fetching ${type} data from the server...`);
    const response = await fetch(`/api/list/data`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type, filter }),
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch ${type} data`);
    }

    const data = (await response.json()) as Note[] | Folder[];
    console.log(`(fetchListContent) Successfully fetched ${type} data from the server.`);

    // Update Zustand state with the fetched data
    if (type === 'Note') {
      setNotesData(data as Note[]);
      setLastNoteFilter(filter as NoteFilterState);
      console.log(`(fetchListContent) Notes data and filter updated.`);
    } else {
      setFoldersData(data as Folder[]);
      setLastFolderFilter(filter as FolderFilterState);
      console.log(`(fetchListContent) Folders data and filter updated.`);
    }

    setLoading(false); // Stop loading
    console.log(`(fetchListContent) ${type} loading state set to false`);
    return data;

  } catch (error) {
    // Log error and ensure loading state is stopped
    console.error(`(fetchListContent) Error fetching ${type} data:`, error);
    setLoading(false); // Stop loading
    console.log(`(fetchListContent) ${type} loading state set to false (error case).`);
    throw error;
  }
  
};


