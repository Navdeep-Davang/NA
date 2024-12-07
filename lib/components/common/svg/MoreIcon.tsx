// lib\components\dashboard\svg\MoreIcon.tsx

import React from 'react';

const MoreIcon: React.FC<{
    width?: string;
    height?: string;
    className?: string; // Optional className for styling
    fill?: string; // Fill color for the icon
    strokeWidth?: number; // Stroke width for the icon
}> = ({
    width = '20',
    height = '20',
    className = '',
    fill = 'currentColor', // Default fill color
    strokeWidth = 1, // Default stroke width
}) => {
    return (
        <svg
            width={width}
            height={height}
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className} // Apply className to the SVG element
        >
            <path
                d="M10 15C10.3438 15 10.638 14.8776 10.8828 14.6328C11.1276 14.388 11.25 14.0938 11.25 13.75C11.25 13.4062 11.1276 13.112 10.8828 12.8672C10.638 12.6224 10.3438 12.5 10 12.5C9.65625 12.5 9.36198 12.6224 9.11719 12.8672C8.8724 13.112 8.75 13.4062 8.75 13.75C8.75 14.0938 8.8724 14.388 9.11719 14.6328C9.36198 14.8776 9.65625 15 10 15ZM10 11.25C10.3438 11.25 10.638 11.1276 10.8828 10.8828C11.1276 10.638 11.25 10.3438 11.25 10C11.25 9.65625 11.1276 9.36198 10.8828 9.11719C10.638 8.8724 10.3438 8.75 10 8.75C9.65625 8.75 9.36198 8.8724 9.11719 9.11719C8.8724 9.36198 8.75 9.65625 8.75 10C8.75 10.3438 8.8724 10.638 9.11719 10.8828C9.36198 11.1276 9.65625 11.25 10 11.25ZM10 7.5C10.3438 7.5 10.638 7.3776 10.8828 7.13281C11.1276 6.88802 11.25 6.59375 11.25 6.25C11.25 5.90625 11.1276 5.61198 10.8828 5.36719C10.638 5.1224 10.3438 5 10 5C9.65625 5 9.36198 5.1224 9.11719 5.36719C8.8724 5.61198 8.75 5.90625 8.75 6.25C8.75 6.59375 8.8724 6.88802 9.11719 7.13281C9.36198 7.3776 9.65625 7.5 10 7.5Z"
                fill={fill} // Apply fill color
                strokeWidth={strokeWidth} // Apply stroke width
            />
        </svg>
    );
};

export default MoreIcon;
