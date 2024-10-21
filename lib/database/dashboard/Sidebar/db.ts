// lib\database\dashboard\Sidebar\db.ts

import { AppData } from "@/lib/Interface/dashboard/Sidebar/UpperPart/types";


export const mydata: AppData = {
    appName: "Quick Note",
    user: {
      name: "John Doe",
      email: "john.doe@example.com",
      avatar: "/path/to/avatar.png",
      plan: "Free",
    },
    notes: {
      recent: [
        { id: 1, title: "Meeting Notes", content: "Discuss project updates." },
        { id: 2, title: "Grocery List", content: "Milk, Bread, Eggs." },
        { id: 3, title: "Workout Plan", content: "Leg day exercises." },
        { id: 4, title: "Reading List", content: "Books to read this month." },
      ],
      favorite: [
        { id: 5, title: "Travel Plans", content: "Plan the trip to Europe." },
        { id: 6, title: "Birthday Ideas", content: "Surprise party for Jane." },
      ],
    },
  };
  