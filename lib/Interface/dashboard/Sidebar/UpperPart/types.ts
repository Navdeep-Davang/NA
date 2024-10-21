// lib\Interface\dashboard\Sidebar\UpperPart\types.ts


export interface User {
    name: string;
    email: string;
    avatar: string;
    plan: string;
}

export interface Note {
    id: number;
    title: string;
    content?: string; 
}

export interface Notes {
    recent?: Note[];
    favorite?: Note[];
}

export interface AppData {
    appName: string;
    user: User;
    notes: Notes; // Use the Notes type here
}