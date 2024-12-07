// lib\components\dashboard\svg\ArrowFilledIcon.tsx

import React from 'react';

const ArrowFilledIcon: React.FC<{
    width?: string;
    height?: string;
    className?: string; // Optional className for styling
    fill?: string; // New prop for fill color
}> = ({
    width = '10', // Updated default width
    height = '10', // Updated default height
    className = '',
    fill = 'currentColor', // Default fill color
}) => {
    return (
        <svg
            width={width}
            height={height}
            viewBox="0 0 10 10" // Updated viewBox
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className} 
        >
            <path
                id="icon"
                d="M0.329677 9.98052C-0.109888 9.62476 -0.109897 0.375248 0.329677 0.0194851C0.769252 -0.336277 10 4.28851 10 5C10 5.71149 0.769243 10.3363 0.329677 9.98052Z"
                fill={fill} // Use the fill prop here
            />
        </svg>
    );
};

export default ArrowFilledIcon;
