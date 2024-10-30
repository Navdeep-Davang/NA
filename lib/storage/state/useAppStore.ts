import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Define order types
type OrderType = 'asc' | 'desc';

// Define filter and pagination types
interface NoteFilterState {
  sortBy: 'createdDate' | 'updatedDate';
  filter: 'all' | 'favorites';
  order: OrderType;
  page: number;
  itemsPerPage: number;
}

interface FolderFilterState {
  sortBy: 'createdDate' | 'updatedDate';
  order: OrderType;
  page: number;
  itemsPerPage: number;
}

// Define Zustand store type
interface AppState {
  appName: string;
  user: { name: string; email: string; avatar: string; plan: string };
  notes: { recent: any[]; favorite: any[] };
  noteFilterState: NoteFilterState;
  folderFilterState: FolderFilterState;
  listElementData: { [key: string]: any[] };

  setDefaultData: (data: any) => void;
  setNoteFilter: (newFilter: Partial<NoteFilterState>) => void;
  setFolderFilter: (newFilter: Partial<FolderFilterState>) => void;
  setListElementData: (filterKey: string, data: any[]) => void;
}

// Zustand store with persistence
const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      appName: "Quick Note",
      user: { name: "", email: "", avatar: "", plan: "" },
      notes: { recent: [], favorite: [] },
      
      noteFilterState: { sortBy: 'createdDate', filter: 'all', order: 'asc', page: 1, itemsPerPage: 10 },
      folderFilterState: { sortBy: 'createdDate', order: 'asc', page: 1, itemsPerPage: 10 },
      listElementData: {},

      setDefaultData: (data) => set({
        appName: data.appName,
        user: data.user,
        notes: { recent: data.notes.recent, favorite: data.notes.favorite }
      }),

      setNoteFilter: (newFilter) => set((state) => ({
        noteFilterState: { ...state.noteFilterState, ...newFilter }
      })),

      setFolderFilter: (newFilter) => set((state) => ({
        folderFilterState: { ...state.folderFilterState, ...newFilter }
      })),

      setListElementData: (filterKey, data) => set((state) => ({
        listElementData: {
          ...state.listElementData,
          [filterKey]: [...(state.listElementData[filterKey] || []), ...data]
        }
      }))
    }),
    { name: 'app-storage' } // Persist state in localStorage
  )
);

export default useAppStore;
