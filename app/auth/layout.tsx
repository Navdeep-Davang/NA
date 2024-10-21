'use client';

// app/auth/layout.tsx
import { usePathname } from 'next/navigation';
import React, { ReactNode } from 'react';
import { Toaster } from "@/components/ui/toaster"

import { 
    LoginSVG, 
    SignupSVG, 
    RequestOTPSVG, 
    VerifyOTPSVG, 
    ResetPasswordSVG 
} from '../../lib/components/auth/svg';

interface AuthLayoutProps {
    children: ReactNode; // Define the type of children
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => { // Corrected line
    const pathname = usePathname();

    const renderSVG = () => {
        switch (pathname) {
            case '/auth/login':
                return <LoginSVG />;
            case '/auth/signup':
                return <SignupSVG />;
            case '/auth/request-otp':
                return <RequestOTPSVG />;
            case '/auth/verify-otp':
                return <VerifyOTPSVG />;
            case '/auth/reset-password':
                return <ResetPasswordSVG />;
            default:
                return null; // Or a default SVG
        }
    };

    return (
        <>
            {/* Toast Component */}
            
            <Toaster />
           
            <div className="flex h-screen relative"> {/* Add 'relative' here */}
                {/* Left Container */}
                <div className="flex-1 bg-gray-100 flex items-center justify-center">
                    {renderSVG()}
                </div>

                {/* Right Container */}
                <div className="flex-1 flex items-center justify-center bg-white">
                    <div className="max-w-md w-full space-y-8">
                        {children}
                    </div>
                </div>
            </div>
        </>

    );
};

export default AuthLayout;
