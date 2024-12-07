//lib\components\editor\EditorWindow\EditorBody\EditorContainer.tsx


import { useEditor } from '@/lib/services/editor/context';
import { useEffect, useRef } from 'react';

const EditorContainer = () => {
  const { editor } = useEditor()!;
  const editorContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (editorContainerRef.current && editor) {
      editorContainerRef.current.innerHTML = ''; // Clear previous DOM contents
      editorContainerRef.current.appendChild(editor);
    }
  }, [editor]);

  return <div className="editor-container" ref={editorContainerRef}></div>;
};

export default EditorContainer;
