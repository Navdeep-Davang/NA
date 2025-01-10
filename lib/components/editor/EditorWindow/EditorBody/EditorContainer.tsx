import {
    BlockNoteSchema,
    combineByGroup,
    filterSuggestionItems,
    locales,
  } from "@blocknote/core";  // Core components for handling block-based editing
  import "@blocknote/core/fonts/inter.css"; // Styling for fonts
  import { BlockNoteView } from "@blocknote/mantine"; // UI component for BlockNote editor
  import "@blocknote/mantine/style.css"; // Mantine styling
  import {
    SuggestionMenuController,
    getDefaultReactSlashMenuItems,
    useCreateBlockNote,
  } from "@blocknote/react"; // React-based functionality for BlockNote
  import {
    getMultiColumnSlashMenuItems,
    multiColumnDropCursor,
    locales as multiColumnLocales,
    withMultiColumn,
  } from "@blocknote/xl-multi-column"; // Multi-column editor specific functionality
  import { useMemo } from "react"; // React's memoization hook
  
  export default function App() {
    // Creates a new editor instance with specific configuration
    const editor = useCreateBlockNote({
      // Enhances schema by adding multi-column functionality
      schema: withMultiColumn(BlockNoteSchema.create()),
      // Configures drop cursor to work in a multi-column context
      dropCursor: multiColumnDropCursor,
      // Merges the default locale with multi-column specific items
      dictionary: {
        ...locales.en,  // Default locale (English)
        multi_column: multiColumnLocales.en, // Multi-column specific locale
      },
      initialContent: [
        {
          type: "paragraph", // Initial content type
          content: "Welcome to this demo!", // Placeholder content
        },
      ],
    });
  
    // Additional logic for the editor can go here
  
    return (
      <BlockNoteView editor={editor} />  // Renders the BlockNote editor with provided configuration
    );
  }
  