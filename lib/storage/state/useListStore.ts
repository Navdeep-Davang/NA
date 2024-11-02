// lib/storage/state/useListStore.ts

import { Folder, Note } from '@/lib/Interface/dashboard/DashboardWindow/DashboardBody/ListElementWindow/ContentView/types';
import { FolderFilterState, NoteFilterState } from '@/lib/Interface/dashboard/DashboardWindow/DashboardBody/ListElementWindow/SearchFilter/types';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ListState {
  notesData: Note[];
  notesFilter: NoteFilterState;
  foldersData: Folder[];
  foldersFilter: FolderFilterState;
  activeTab: 'Note' | 'Folder'; 
  loading: boolean;

  // setLoading: (isLoading: boolean) => void;
  setActiveTab: (tab: 'Note' | 'Folder') => void;
  setNotesFilter: (newFilter: Partial<NoteFilterState>) => void;
  setFoldersFilter: (newFilter: Partial<FolderFilterState>) => void;
  setNotesData: (notes: Note[]) => void;
  setFoldersData: (folders: Folder[]) => void;
  toggleFolderCategory: (folderName: string) => void;
}

const useListStore = create<ListState>()(
  persist(
    (set) => ({
      notesData: [],

      notesFilter: {
        sortBy: 'updatedDate',
        category: 'all',
        order: 'asc',
        page: 1,
        itemsPerPage: 10,
      } as NoteFilterState,

      foldersData: [],

      foldersFilter: {
        sortBy: 'updatedDate',
        category: 'all',
        order: 'asc',
        page: 1,
        itemsPerPage: 10,
      } as FolderFilterState,

      activeTab: 'Note',

      loading: true,

      // setLoading: (isLoading) => set((state) => ({ ...state, loading: isLoading })),

      setActiveTab: (tab) => set((state) => {
        if (state.activeTab !== tab) {
          return { activeTab: tab };
        }
        return state;
      }),

      setNotesFilter: (newFilter) => set((state) => ({
        notesFilter: { ...state.notesFilter, ...newFilter },
      })),
      
      setFoldersFilter: (newFilter) => set((state) => ({
        foldersFilter: { ...state.foldersFilter, ...newFilter },
      })),

      setNotesData: (notes) => set(() => ({ notesData: notes })),
      
      setFoldersData: (folders) => set(() => ({ foldersData: folders })),

      toggleFolderCategory: (folderName) => set((state) => ({
        foldersData: state.foldersData.map((folder) =>
          folder.name === folderName
            ? { ...folder, category: folder.category === 'Favorite' ? 'All' : 'Favorite' }
            : folder
        ),
      })),
    }),
    
    {
      name: 'list-storage',
      onRehydrateStorage: () => (state) => {
        if (state) {
          setTimeout(() => {
            state.loading = false;
            // state.setLoading(false); // Ensure setLoading is used
          }, 0);
        }
      }      ,
    }
  )
);

export default useListStore;
