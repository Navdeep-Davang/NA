// app/Editor/page.tsx

import Editor from '@/lib/components/editor';
import { EditorSkeleton } from '@/lib/components/editor/Skeleton';
import React, { Suspense } from 'react';


const EditorPage = () => {
    return (
        <Suspense fallback={<EditorSkeleton/>}>
            <Editor />
        </Suspense>
    );

};

export default EditorPage;
