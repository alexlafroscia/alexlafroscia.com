import { useEffect, useState } from 'react';
import { debounce } from 'lodash';

export enum Breakpoint {
  xxlarge = 'xxlarge',
  xlarge = 'xlarge',
  large = 'large',
  medium = 'medium',
  small = 'small',
  xsmall = 'xsmall',
  xxsmall = 'xxsmall'
}

type BreakpointSizeMap = {
  [key in Breakpoint]: {
    min: number;
    max: number;
  };
};

const DEFAULT_BREAKPOINT = Breakpoint.xxsmall;
const breakpoints: BreakpointSizeMap = {
  [Breakpoint.xxlarge]: { min: 1681, max: Infinity },
  [Breakpoint.xlarge]: { min: 1281, max: 1680 },
  [Breakpoint.large]: { min: 981, max: 1280 },
  [Breakpoint.medium]: { min: 737, max: 980 },
  [Breakpoint.small]: { min: 481, max: 736 },
  [Breakpoint.xsmall]: { min: 361, max: 480 },
  [Breakpoint.xxsmall]: { min: 0, max: 360 }
};

function getCurrentBreakpoint(): Breakpoint {
  // Use the default in a SSR environment
  if (typeof document === 'undefined') {
    return DEFAULT_BREAKPOINT;
  }

  const width = document.documentElement.clientWidth;

  for (const key in breakpoints) {
    const { min, max } = breakpoints[key];

    if (width >= min && max >= width) {
      return key as Breakpoint;
    }
  }

  throw new Error('Could not find the breakpoint');
}

function useBreakpoint(): Breakpoint {
  // Initial state must match the SSR state
  const [breakpoint, setBreakpoint] = useState<Breakpoint>(DEFAULT_BREAKPOINT);
  const setCurrentBreakpoint = debounce(() => {
    setBreakpoint(getCurrentBreakpoint());
  }, 100);

  useEffect(
    function() {
      // Immeditately queue an update to the real screen size
      setCurrentBreakpoint();

      window.addEventListener('resize', setCurrentBreakpoint);

      return () => {
        window.removeEventListener('resize', setCurrentBreakpoint);
      };
    },
    [setCurrentBreakpoint]
  );

  return breakpoint;
}

export default useBreakpoint;
