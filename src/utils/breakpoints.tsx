import { Component, ReactNode } from "react";
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

type BreakpointProps = {
  children: (breakpoint: string) => ReactNode;
};
type BreakpointState = {
  breakpoint: string;
};

export default class Breakpoint extends Component<
  BreakpointProps,
  BreakpointState
> {
  // Initial state must match the SSR state
  state = { breakpoint: DEFAULT_BREAKPOINT };

  setBreakpoint = debounce(() => {
    this.setState({ breakpoint: getCurrentBreakpoint() });
  }, 100);

  componentDidMount() {
    // Immeditately queue an update to the real screen size
    this.setBreakpoint();
    window.addEventListener("resize", this.setBreakpoint);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.setBreakpoint);
  }

  render() {
    const { children } = this.props;

    return children(this.state.breakpoint);
  }
}
