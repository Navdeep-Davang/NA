// lib/storage/state/useListStore.ts

import { Folder, Note } from '@/lib/Interface/dashboard/DashboardWindow/DashboardBody/ListElementWindow/ContentView/types';
import { FolderFilterState, NoteFilterState } from '@/lib/Interface/dashboard/DashboardWindow/DashboardBody/ListElementWindow/SearchFilter/types';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ListState {
  notesData: Note[];
  notesFilter: NoteFilterState;
  lastNoteFilter: NoteFilterState | {}; 
  foldersData: Folder[];
  foldersFilter: FolderFilterState;  
  lastFolderFilter: FolderFilterState | {}; 
  activeTab: 'Note' | 'Folder'; 
  viewMode: 'List' | 'Grid';
  loading: boolean;
  loadingNotes: boolean;
  loadingFolders: boolean;
  notePage: number;
  folderPage: number;

  // setLoading: (isLoading: boolean) => void;
  setActiveTab: (tab: 'Note' | 'Folder') => void;
  setViewMode: (mode: 'Grid' | 'List')  => void;
  setNotesFilter: (newFilter: Partial<NoteFilterState>) => void;
  setLastFolderFilter: (filter: FolderFilterState) => void;
  setFoldersFilter: (newFilter: Partial<FolderFilterState>) => void;
  setLastNoteFilter: (filter: NoteFilterState) => void;   
  setNotesData: (notes: Note[]) => void;
  setFoldersData: (folders: Folder[]) => void;
  toggleFolderCategory: (folderName: string) => void;
  setLoadingNotes: (loadingState: boolean) => void;
  setLoadingFolders: (loadingState: boolean) => void;
  setNotePage: (page: number) => void;
  setFolderPage: (page: number) => void;
}

const useListStore = create<ListState>()(
  persist(
    (set) => ({
      notesData: [],

      notesFilter: {
        sortBy: 'updatedDate',
        category: 'all',
        order: 'desc',
        page: 1,
        itemsPerPage: 10,
      } as NoteFilterState,
    
      foldersData: [],

      foldersFilter: {
        sortBy: 'updatedDate',
        category: 'all',
        order: 'desc',
        page: 1,
        itemsPerPage: 10,
      } as FolderFilterState,

      activeTab: 'Note',

      viewMode: 'List',

      notePage: 1,
      folderPage: 1,

      loading: true,
      loadingNotes: true,
      loadingFolders: true,

      lastNoteFilter: {},  
      lastFolderFilter: {},


      // setLoading: (isLoading) => set((state) => ({ ...state, loading: isLoading })),

      setActiveTab: (tab) => set((state) => {
        if (state.activeTab !== tab) {
          return { activeTab: tab };
        }
        return state;
      }),

      setViewMode: (mode: 'Grid' | 'List') => set(() => ({ viewMode: mode })),

      setNotesFilter: (newFilter) => set((state) => ({
        notesFilter: { ...state.notesFilter, ...newFilter },
      })),

      setLastNoteFilter: (filter) => set((state) => ({
        lastNoteFilter: { ...state.lastNoteFilter, ...filter },
      })),
      
      setFoldersFilter: (newFilter) => set((state) => ({
        foldersFilter: { ...state.foldersFilter, ...newFilter },
      })),
      
      setLastFolderFilter: (filter) => set((state) => ({
        lastFolderFilter: { ...state.lastFolderFilter, ...filter },
      })),

      setNotesData: (notes) => set(() => ({ notesData: notes })),
      
      setFoldersData: (folders) => set(() => ({ foldersData: folders })),

      setLoadingNotes: (loadingState) => set(() => ({ loadingNotes: loadingState })),

      setLoadingFolders: (loadingState) => set(() => ({ loadingFolders: loadingState })),

      setNotePage: (page: number) => set((state) => {
        state.notesFilter.page = page;
        return { notePage: page };
      }),
      setFolderPage: (page: number) => set((state) => {
        state.foldersFilter.page = page;
        return { folderPage: page };
      }),

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
