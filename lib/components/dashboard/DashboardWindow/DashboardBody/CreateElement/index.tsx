// lib/components/dashboard/DashboardBody/CreateElement/index.tsx
import { Card } from '@/components/ui/card';
import React from 'react';
import {  CreateFolderIcon, TakeNoteIcon } from '../../../../common/svg';

const CreateElement = () => {
    return (
        <div className="h-auto p-4 theme-background rounded-lg flex-col justify-start items-start gap-2.5 inline-flex w-full">
            <div className="self-stretch h-6 flex-col justify-start items-start flex w-full"> 
                <div className="text-lg font-semibold">Create</div>
            </div>
            <div className="self-stretch p-2 justify-start items-center gap-8 inline-flex w-full flex-wrap ">

                <Card className="group theme-button-border theme-button-background theme-button-shadow p-4 gap-3 w-full sm:w-auto sm:flex-1 min-w-[250px] flex flex-shrink-0 transition-shadow duration-300">
                    <div className="p-2 theme-button-icon group-hover:theme-button-icon-hover rounded-lg justify-start items-center flex">
                        <TakeNoteIcon width="60" height="100%" className="w-full h-full" />
                    </div>
                    <div className="p-1 rounded flex-col justify-center items-start gap-1 inline-flex w-full"> 
                        <div className="text-center theme-button-title group-hover:theme-button-title-hover text-xl font-bold ">Notes</div>
                        <div className="text-center theme-button-text group-hover:theme-button-text-hover text-base font-medium">Create note file</div>
                    </div>
                </Card>



                {/* Folder Card */}
                <Card className="group theme-button-border theme-button-background theme-button-shadow p-4 gap-3 w-full sm:w-auto sm:flex-1 min-w-[250px] flex flex-shrink-0 transition-shadow duration-300">
                    <div className="p-2 theme-button-icon group-hover:theme-button-icon-hover rounded-lg justify-start items-center flex">
                        <CreateFolderIcon width="60" height="100%" className="w-full h-full" />
                    </div>
                    <div className="p-1 rounded flex-col justify-center items-start gap-1 inline-flex w-full"> 
                        <div className="text-center theme-button-title group-hover:theme-button-title-hover text-xl font-bold ">Folders</div>
                        <div className="text-center theme-button-text group-hover:theme-button-text-hover text-base font-medium">Create new folder</div>
                    </div>
                </Card>

            </div>

        </div>
    );
};

export default CreateElement;
