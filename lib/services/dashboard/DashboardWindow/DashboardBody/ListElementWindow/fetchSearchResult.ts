// lib/services/dashboard/DashboardWindow/DashboardBody/ListElementWindow/fetchSearchResult.ts

// Mock data for folders and notes
const mockFolders: { id: string; name: string }[] = [
  { id: '1', name: 'Project Docs' },
  { id: '2', name: 'Meeting Notes' },
  { id: '3', name: 'Personal' },
  { id: '4', name: 'Archive' },
  { id: '5', name: 'Research' },
  { id: '6', name: 'Travel Plans' },
  { id: '7', name: 'Event Planning' },
  { id: '8', name: 'To-Do Lists' },
  { id: '9', name: 'Ideas' },
  { id: '10', name: 'Financial Records' },
];

const mockNotes: { id: string; title: string }[] = [
  { id: '1', title: 'Weekly Review' },
  { id: '2', title: 'Client Feedback' },
  { id: '3', title: 'Budget Analysis' },
  { id: '4', title: 'Personal Goals' },
  { id: '5', title: 'Meeting Summary' },
  { id: '6', title: 'Project Timeline' },
  { id: '7', title: 'Design Mockups' },
  { id: '8', title: 'Marketing Strategies' },
  { id: '9', title: 'Sprint Planning' },
  { id: '10', title: 'Brainstorming Session' },
];

// Function to simulate search filtering
export const fetchSearchResult = async (searchTerm: string) => {
  // If input is empty, return empty arrays
  if (!searchTerm.trim()) {
    return { folders: [], notes: [] };
  }

  // Simulate a delay to mimic an API call
  await new Promise((resolve) => setTimeout(resolve, 300));

  const regex = new RegExp(searchTerm, 'i'); // Case-insensitive regex for matching

  // Filter folders and notes based on regex
  const filteredFolders = mockFolders.filter((folder) => regex.test(folder.name));
  const filteredNotes = mockNotes.filter((note) => regex.test(note.title));

  // Return filtered results
  return { folders: filteredFolders, notes: filteredNotes };
};

