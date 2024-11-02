// lib\components\dashboard\DashboardWindow\DashboardBody\ListElementWindow\ContentView\ListView\FavoriteToggler.tsx


import { FavoriteIcon } from "@/lib/components/dashboard/svg";
import React from "react";

interface FavoriteTogglerProps {
  category: 'Favorite' | 'All'; // Accept category prop
  // onToggle: () => void; // Function to toggle favorite state
}

const FavoriteToggler: React.FC<FavoriteTogglerProps> = ({ category }) => {
  // Determine the variant based on the category
  const variant = category === 'Favorite' ? 'selected' : 'add'; 

  return (
    <div className="p-1 rounded-lg hover:bg-[#ffffff]/20 cursor-pointer" >
      <FavoriteIcon
        variant={variant} // Pass the variant to the FavoriteIcon
        width="24" // Set the icon width
        height="24" // Set the icon height
        className="list-item-text" // Apply the CSS class for styling
      />
    </div>
  );
};

export default FavoriteToggler;
