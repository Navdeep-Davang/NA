// lib/hooks/useWindowType.ts
import { useEffect, useState } from 'react';

export const useWindowType = () => {
  const [isMobileWindow, setIsMobileWindow] = useState(false);
  const [isTabletWindow, setIsTabletWindow] = useState(false);
  const [isDesktopWindow, setIsDesktopWindow] = useState(false);

  useEffect(() => {
    const updateWindowType = () => {
      const width = window.innerWidth;

      setIsMobileWindow(width <= 768); // Mobile: max-width 768px
      setIsTabletWindow(width > 768 && width <= 1024); // Tablet: 769px to 1024px
      setIsDesktopWindow(width > 1024); // Desktop: min-width 1025px
    };

    updateWindowType(); // Initial call
    window.addEventListener('resize', updateWindowType);

    return () => window.removeEventListener('resize', updateWindowType);
  }, []);

  return { isMobileWindow, isTabletWindow, isDesktopWindow };
};
