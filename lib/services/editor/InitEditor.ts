import { AffineEditorContainer } from '@blocksuite/presets';
import { Doc, Schema } from '@blocksuite/store';
import { DocCollection } from '@blocksuite/store';
import { AffineSchemas } from '@blocksuite/blocks';

// Editor initialization logic
export function initEditor() {
  const schema = new Schema().register(AffineSchemas);
  const collection = new DocCollection({ schema });
  collection.meta.initialize();

  const doc = collection.createDoc({ id: 'page1' });
  doc.load(() => {
    const pageBlockId = doc.addBlock('affine:page' as 'affine:page');
    doc.addBlock('affine:surface' as 'affine:surface', {}, pageBlockId);
    const noteId = doc.addBlock('affine:note' as 'affine:note', {}, pageBlockId);
    doc.addBlock('affine:paragraph' as 'affine:paragraph', {}, noteId);
  });

  const editor = new AffineEditorContainer();
  editor.doc = doc;

  // Handle missing slot issue safely
  if (editor.slots?.docLinkClicked) {
    editor.slots.docLinkClicked.on(({ docId }) => {
      const target = <Doc>collection.getDoc(docId);
      editor.doc = target;
    });
  }

  return { editor, collection };
}
