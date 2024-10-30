// lib/components/dashboard/DashboardBody/CreateElement/index.tsx
import React from 'react';

const CreateElement = () => {
    return (
        <div className="h-44 p-4 bg-neutral-800 rounded-lg flex-col justify-start items-start gap-2.5 inline-flex w-full">
            <div className="self-stretch h-6 flex-col justify-start items-start flex w-full"> 
                <div className="text-center text-white text-base font-medium leading-normal tracking-tight">Create</div>
            </div>
            <div className="self-stretch p-2 justify-start items-center gap-8 inline-flex w-full"> 
                <div className="grow shrink basis-0 h-24 p-4 bg-white rounded-lg justify-start items-center gap-4 flex w-full"> 
                    <div className="p-3 bg-[#434343] rounded justify-start items-center gap-2.5 flex">
                        <div className="justify-start items-center gap-2.5 flex">
                            <div className="w-8 h-8 relative"></div>
                        </div>
                    </div>
                    <div className="p-1 bg-[#e2e2e2]/10 rounded flex-col justify-center items-start gap-1 inline-flex w-full"> 
                        <div className="text-center text-[#7e7979] text-xl font-bold tracking-tight">Notes</div>
                        <div className="text-center text-[#7e7979] text-base font-medium leading-normal tracking-tight">Create note file</div>
                    </div>
                </div>
                <div className="grow shrink basis-0 h-24 p-4 bg-white rounded-lg justify-start items-center gap-4 flex w-full">
                    <div className="p-3 bg-[#434343] rounded justify-start items-center gap-2.5 flex">
                        <div className="justify-start items-center gap-2.5 flex">
                            <div className="w-8 h-8 relative"></div>
                        </div>
                    </div>
                    <div className="p-1 bg-[#e2e2e2]/10 rounded flex-col justify-center items-start gap-1 inline-flex w-full"> 
                        <div className="text-center text-[#7e7979] text-xl font-bold tracking-tight">Folders</div>
                        <div className="text-center text-[#7e7979] text-base font-medium leading-normal tracking-tight">Create new folder</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateElement;
