// lib\components\editor\index.tsx

import SharedBoardLayout from "../common/shared-board-layout";
import EditorWindow from "./EditorWindow";

const Editor = () => {
  return (
    <SharedBoardLayout>       
        <EditorWindow/>     
    </SharedBoardLayout>
  );
};

export default Editor;