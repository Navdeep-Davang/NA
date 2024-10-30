// lib/components/dashboard/DashboardWindow/DashboardBody/RecentElement/index.tsx

import React from 'react';

const RecentElement = () => {
    return (
        <div className="w-full h-80 p-4 bg-neutral-800 rounded-lg flex-col justify-start items-start gap-2.5 inline-flex">
            <div className="h-6 flex-col justify-start items-start flex">
                <div className="text-center text-white text-base font-medium leading-normal tracking-tight">
                    Recent Notes
                </div>
            </div>
            <div className="self-stretch p-2 justify-start items-center gap-8 inline-flex">
                {/* First Note */}
                <div className="grow shrink basis-0 p-3 bg-white/10 rounded-lg flex-col justify-start items-start gap-6 inline-flex">
                    <div className="self-stretch h-40 rounded-lg flex-col justify-center items-center flex">
                        <img
                            className="h-full object-cover self-stretch grow shrink basis-0 rounded-lg"
                            src="https://via.placeholder.com/317x160"
                            alt="Recent Note"
                        />
                    </div>
                    <div className="self-stretch px-2 justify-start items-center inline-flex">
                        <div className="w-36 flex-col justify-start items-start gap-2 inline-flex">
                            <div className="self-stretch text-white text-xl font-semibold tracking-tight">Title</div>
                        </div>
                    </div>
                </div>

                {/* Second Note */}
                <div className="grow shrink basis-0 p-3 bg-white/10 rounded-lg flex-col justify-start items-start gap-6 inline-flex">
                    <div className="self-stretch h-40 rounded-lg flex-col justify-center items-center flex">
                        <img
                            className="self-stretch grow shrink basis-0 rounded-lg"
                            src="https://via.placeholder.com/317x160"
                            alt="Recent Note"
                        />
                    </div>
                    <div className="self-stretch px-2 justify-start items-center inline-flex">
                        <div className="w-36 flex-col justify-start items-start gap-2 inline-flex">
                            <div className="self-stretch text-white text-xl font-semibold tracking-tight">Title</div>
                        </div>
                    </div>
                </div>

                {/* Third Note */}
                <div className="grow shrink basis-0 p-3 bg-white/10 rounded-lg flex-col justify-start items-start gap-6 inline-flex">
                    <div className="self-stretch h-40 rounded-lg flex-col justify-center items-center flex">
                        <img
                            className="self-stretch grow shrink basis-0 rounded-lg"
                            src="https://via.placeholder.com/317x160"
                            alt="Recent Note"
                        />
                    </div>
                    <div className="self-stretch px-2 justify-start items-center inline-flex">
                        <div className="w-36 flex-col justify-start items-start gap-2 inline-flex">
                            <div className="self-stretch text-white text-xl font-semibold tracking-tight">Title</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RecentElement;
