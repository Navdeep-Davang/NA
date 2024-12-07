// lib\Interface\dashboard\DashboardWindow\DashboardBody\ListElementWindow\ContentView\types.ts



export interface Note {  
  id: string;
  title: string;
  lastUpdated: string;
  dateCreated: string;
  imageUrl: string;
}


export interface Folder {
  id: string;
  name: string;
  fileCount: string;
  lastUpdated: string;
  dateCreated: string;
  category: "Favorite" | "All" ; // Explicitly define the allowed categories
  isfavorite: boolean
}

