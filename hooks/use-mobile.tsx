import * as React from "react";

const MOBILE_BREAKPOINT = 768;
const TABLET_BREAKPOINT = 1024; // Define tablet breakpoint

export function useIsSmall() {
  const [isSmall, setIsSmall] = React.useState<boolean | undefined>(undefined);

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${TABLET_BREAKPOINT - 1}px)`); // Tablet breakpoint
    const onChange = () => {
      setIsSmall(window.innerWidth < TABLET_BREAKPOINT); // Check if width is less than tablet breakpoint
    };

    mql.addEventListener("change", onChange);
    setIsSmall(window.innerWidth < TABLET_BREAKPOINT); // Initialize state
    return () => mql.removeEventListener("change", onChange);
  }, []);

  return !!isSmall;
}
