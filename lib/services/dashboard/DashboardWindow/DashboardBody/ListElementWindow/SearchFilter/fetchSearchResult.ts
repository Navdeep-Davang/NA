// lib/services/dashboard/DashboardWindow/DashboardBody/ListElementWindow/fetchSearchResult.ts

export const fetchSearchResult = async (searchTerm: string) => {
  // If input is empty, return empty arrays
  if (!searchTerm.trim()) {
    return { folders: [], notes: [] };
  }

  // Simulate a delay to mimic an API call
  await new Promise((resolve) => setTimeout(resolve, 300));

  const response = await fetch('/api/list/search', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ searchTerm }),
  });

  // Check for response validity
  if (!response.ok) {
    throw new Error('Failed to fetch search results');
  }

  const data = await response.json();

  // Return filtered results directly from the mock server response
  return { folders: data.folders, notes: data.notes };
};
