import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { History } from 'lucide-react';
import { recentNotesData } from '@/lib/storage/data/dashboard/DashboardWindow/DashboardBody/RecentElement/db';

const RecentElement = () => {


    return (
        <div className="w-full h-auto p-6 theme-background rounded-lg flex-col justify-start items-start gap-4">
            <header className="flex justify-between items-center w-full mb-4">
                <h2 className="text-lg  font-semibold text-theme-card-title">
                    Recent Notes
                </h2>
            </header>
            <main className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {recentNotesData.map((note) => (
                    <Card 
                        key={note.id} 
                        className="flex flex-col transition-shadow duration-300 theme-card-background theme-card-border theme-card-shadow hover:theme-card-hover-shadow"
                    >
                        <CardHeader className="p-4 rounded-lg overflow-hidden">
                            <img
                                className="w-full h-full rounded-lg object-cover"
                                src={note.image}
                                alt={`Recent Note titled "${note.title}"`} // More descriptive alt text
                            />
                        </CardHeader>
                        <CardContent className='pb-4'  >
                            <CardTitle className=" tracking-normal text-theme-card-title text-lg font-medium">
                                {note.title}
                            </CardTitle>
                            <CardDescription className="flex items-center text-theme-card-text text-sm mt-2 space-x-1">
                                <History className="w-4 h-4 text-theme-card-text" /> {/* Adjust icon size and color */}
                                <span className="text-theme-card-text">{note.lastUpdated}</span> {/* Adjust text styling */}
                            </CardDescription>

                        </CardContent>                    
                    </Card>
                ))}
            </main>
        </div>
    );
};

export default RecentElement;