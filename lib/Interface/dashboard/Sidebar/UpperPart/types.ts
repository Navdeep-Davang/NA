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

export interface Folder {
    id: number;
    name: string;
    content?: string; 
}

export interface List {
    recent?: Note[];
    favorite?: Folder[];
}

export interface AppData {
    appName: string;
    user: User;
    list: List; // Use the Notes type here
}