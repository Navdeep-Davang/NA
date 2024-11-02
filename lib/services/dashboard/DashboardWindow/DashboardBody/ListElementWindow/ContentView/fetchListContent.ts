// lib/services/dashboard/DashboardWindow/DashboardBody/ListElementWindow/ContentView/fetchListContent.ts

import useListStore from '@/lib/storage/state/useListStore';
import { Note, Folder } from '@/lib/Interface/dashboard/DashboardWindow/DashboardBody/ListElementWindow/ContentView/types';
import { FolderFilterState, NoteFilterState } from '@/lib/Interface/dashboard/DashboardWindow/DashboardBody/ListElementWindow/SearchFilter/types';

interface FetchListContentParams {
  type: 'Note' | 'Folder';
  filter: NoteFilterState | FolderFilterState;
}

const fetchListContent = async ({ type, filter }: FetchListContentParams): Promise<Note[] | Folder[]> => {
  const store = useListStore.getState();

  // Check if data exists in Zustand for the current filter and type
  const existingData = type === 'Note' ? store.notesData : store.foldersData;
  const existingFilter = type === 'Folder' ? store.setNotesFilter : store.setFoldersFilter;

  // Check if the data matches the filter
  const isDataInStore = JSON.stringify(existingFilter) === JSON.stringify(filter);

  if (isDataInStore && existingData.length > 0) {
    return existingData;
  }

  try {
    // If data is not in Zustand, fetch from Next.js API
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
      store.setNotesData(data as Note[]);
      store.setNotesFilter(filter as Partial<NoteFilterState>); // Update notes filter in Zustand
    } else {
      store.setFoldersData(data as Folder[]);
      store.setFoldersFilter(filter as Partial<FolderFilterState>); // Update folders filter in Zustand
    }

    return data;
  } catch (error) {
    console.error(`Error fetching ${type} content:`, error);
    throw error;
  }
};

export default fetchListContent;
