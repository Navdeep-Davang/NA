//lib\components\editor\EditorWindow\index.tsx

"use client";
import React from 'react';
import EditorHeader from './EditorHeader';
import EditorContainer from './EditorBody/EditorContainer';

// Define the prop type for DashboardWindow

const EditorWindow= () => {
    return (
            <div className="theme-dashboard-window flex-1 min-h-screen px-4 lg:px-8 overflow-y-auto overflow-x-auto custom-scrollbar flex flex-col">
                <EditorHeader />
                <EditorContainer />
            </div>      

    );
};

export default EditorWindow;
