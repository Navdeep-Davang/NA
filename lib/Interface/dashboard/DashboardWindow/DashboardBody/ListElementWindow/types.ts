// lib\Interface\dashboard\DashboardWindow\DashboardBody\ListElementWindow\types.ts



export interface Folders {
  name: string;
  fileCount: string;
  lastUpdated: string;
  dateCreated: string;
  category: "Favorite" | "All" ; // Explicitly define the allowed categories
}

export interface Folder {
  id: string;
  name: string;
}

export interface Note {  
  id: string;
  title: string;
}