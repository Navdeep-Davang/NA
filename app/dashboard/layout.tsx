"use client";

import SharedBoardLayout from "@/app/_common/shared-board-layout";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <SharedBoardLayout layoutType="dashboard">
      {children}
    </SharedBoardLayout>
  );
};

export default Layout;