// lib\Interface\dashboard\DashboardWindow\DashboardBody\ListElementWindow\SearchFilter\types.ts


export interface Folder {
  id: string;
  name: string;  
}


export interface Note {  
  id: string;
  title: string;
}


export type OrderType = 'asc' | 'desc';


export type NoteSortBy = 'createdDate' | 'updatedDate' | 'name';
export type FolderSortBy = 'createdDate' | 'updatedDate' | 'name' | 'fileCount';

export interface NoteFilterState {
  sortBy: NoteSortBy ;
  category: 'all';
  order: OrderType;
  page: number;
  itemsPerPage: number;
}

export interface FolderFilterState {
  sortBy: FolderSortBy;
  category: 'all' | 'favorites';
  order: OrderType;
  page: number;
  itemsPerPage: number;
}


export type FilterState = FolderFilterState | NoteFilterState;

  
  