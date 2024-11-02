// lib\components\dashboard\DashboardWindow\DashboardBody\ListElementWindow\ContentView\index.tsx

import * as React from "react";
import GridView from "./GridView";
import ListView from "./ListView";
import useListStore from "@/lib/storage/state/useListStore";


interface ContentViewProps {
  viewMode: 'Grid' | 'List';
  
}

const ContentView: React.FC<ContentViewProps> = ({ viewMode }) => {

  const { activeTab } = useListStore();

  return (
    <div className={`${viewMode === 'Grid' ? 'GridView' : 'ListView'} flex flex-col gap-4`}>
      {viewMode === 'List' ? (
        <ListView />
      ) : (
        <GridView />
      )}
    </div>
  );
};

export default ContentView;
