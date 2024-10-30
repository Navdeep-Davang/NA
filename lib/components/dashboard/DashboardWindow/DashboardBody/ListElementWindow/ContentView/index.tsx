// lib\components\dashboard\DashboardWindow\DashboardBody\ListElementWindow\ContentView\index.tsx

import * as React from "react";
import GridView from "./GridView";
import ListView from "./ListView";


interface ContentViewProps {
  viewMode: 'Grid' | 'List';
  activeTab: 'Note' | 'Folder'; // Change from string to specific string literal types
}

const ContentView: React.FC<ContentViewProps> = ({ viewMode, activeTab }) => {
  return (
    <div className={`${viewMode === 'Grid' ? 'GridView' : 'ListView'} flex flex-col gap-4`}>
      {viewMode === 'List' ? (
        <ListView activeTab={activeTab} />
      ) : (
        <GridView activeTab={activeTab} />
      )}
    </div>
  );
};

export default ContentView;
