import { useEffect, useState } from "react";
import { debounce } from "lodash";

const DEFAULT_BREAKPOINT = "xxsmall";
const breakpoints = {
  xxlarge: { min: 1681, max: Infinity },
  xlarge: { min: 1281, max: 1680 },
  large: { min: 981, max: 1280 },
  medium: { min: 737, max: 980 },
  small: { min: 481, max: 736 },
  xsmall: { min: 361, max: 480 },
  xxsmall: { min: 0, max: 360 }
};

function getCurrentBreakpoint() {
  // Use the default in a SSR environment
  if (typeof document === "undefined") {
    return DEFAULT_BREAKPOINT;
  }

  const width = document.documentElement.clientWidth;

  for (let key in breakpoints) {
    const { min, max } = breakpoints[key];

    if (width >= min && max >= width) {
      return key;
    }
  }

  throw new Error("Could not find the breakpoint");
}

function useBreakpoint() {
  // Initial state must match the SSR state
  const [breakpoint, setBreakpoint] = useState(DEFAULT_BREAKPOINT);
  const setCurrentBreakpoint = debounce(() => {
    setBreakpoint(getCurrentBreakpoint());
  }, 100);

  useEffect(
    function() {
      // Immeditately queue an update to the real screen size
      setCurrentBreakpoint();

      window.addEventListener("resize", setCurrentBreakpoint);

      return () => {
        window.removeEventListener("resize", setCurrentBreakpoint);
      };
    },
    [setCurrentBreakpoint]
  );

  return breakpoint;
}

export default useBreakpoint;
