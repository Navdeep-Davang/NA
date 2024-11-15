// lib/components/dashboard/DashboardBody/CreateElement/index.tsx
import { Card } from '@/components/ui/card';
import React from 'react';

const CreateElement = () => {
    return (
        <div className="h-auto p-4 bg-neutral-800 rounded-lg flex-col justify-start items-start gap-2.5 inline-flex w-full">
            <div className="self-stretch h-6 flex-col justify-start items-start flex w-full"> 
                <div className="text-center text-white text-base font-medium leading-normal tracking-tight">Create</div>
            </div>
            <div className="self-stretch p-2 justify-start items-center gap-8 inline-flex w-full flex-wrap ">

                <Card className="group theme-card-background theme-card-border theme-card-shadow hover:theme-card-hover-shadow p-4 gap-4 w-full sm:w-auto sm:flex-1 min-w-[250px] flex flex-shrink-0 transition-shadow duration-300">

                    <div className="p-3 bg-white/20 rounded justify-start items-center gap-2.5 flex">
                        <div className="justify-start items-center gap-2.5 flex">
                            <div className="w-8 h-8 relative"></div>
                        </div>
                    </div>
                    <div className="p-1 rounded flex-col justify-center items-start gap-1 inline-flex w-full"> 
                        <div className="text-center text-white text-xl font-bold tracking-tight">Notes</div>
                        <div className="text-center text-white text-base font-medium leading-normal tracking-tight">Create note file</div>
                    </div>
                </Card>

                {/* Folder Card */}
                <Card className="group theme-card-background theme-card-border theme-card-shadow hover:theme-card-hover-shadow p-4 gap-4 w-full sm:w-auto sm:flex-1 min-w-[250px] flex flex-shrink-0 transition-shadow duration-300">

                    <div className="p-3 bg-white/20 rounded justify-start items-center gap-2.5 flex">
                        <div className="justify-start items-center gap-2.5 flex">
                            <div className="w-8 h-8 relative"></div>
                        </div>
                    </div>
                    <div className="p-1 rounded flex-col justify-center items-start gap-1 inline-flex w-full"> 
                        <div className="text-center text-white text-xl font-bold tracking-tight">Folders</div>
                        <div className="text-center text-white text-base font-medium leading-normal tracking-tight">Create new folder</div>
                    </div>
                </Card>

            </div>

        </div>
    );
};

export default CreateElement;
