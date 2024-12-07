'use client';

import { EditorContext } from '@/lib/services/editor/context';
import { initEditor } from '@/lib/services/editor/initEditor';
import React, { useEffect, useState } from 'react';

export const EditorProvider = ({ children }: { children: React.ReactNode }) => {
  const [editorContext, setEditorContext] = useState({
    editor: null,
    collection: null,
  });

  useEffect(() => {
    const { editor, collection } = initEditor();
    setEditorContext({ editor, collection });
  }, []);

  return (
    <EditorContext.Provider value={editorContext}>
      {children}
    </EditorContext.Provider>
  );
};
