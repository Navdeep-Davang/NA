import { AffineEditorContainer } from '@blocksuite/presets';
import { DocCollection } from '@blocksuite/store';

// Define the shared Editor context type
export interface EditorContextType {
  editor: AffineEditorContainer | null;
  collection: DocCollection | null;
  updateCollection?: (newCollection: DocCollection) => void;
}

// Create a shared EditorContext
import { createContext, useContext } from 'react';

export const EditorContext = createContext<EditorContextType | null>(null);

// Custom hook to access context
export function useEditor() {
  return useContext(EditorContext);
}
