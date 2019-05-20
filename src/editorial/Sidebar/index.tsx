import React, { FC, useCallback, useMemo, useState } from "react";
import cx from "@sindresorhus/class-names";

import useBreakpoint, { Breakpoint } from "../../hooks/useBreakpoint";

export { default as Footer } from "./Footer";
export { default as Header } from "./Header";
export { default as Nav } from "./Nav";
export { default as Section } from "./Section";

type SidebarProps = { className?: string };

enum SIDEBAR_ACTIVE {
  "INITIAL",
  "YES",
  "NO"
}

const Sidebar: FC<SidebarProps> = ({ children, className, ...rest }) => {
  const breakpoint = useBreakpoint();
  const [active, setActive] = useState<SIDEBAR_ACTIVE>(SIDEBAR_ACTIVE.INITIAL);
  const sidebarIsOpen = useMemo(
    () =>
      active === SIDEBAR_ACTIVE.INITIAL
        ? [Breakpoint.xlarge, Breakpoint.xxlarge].includes(breakpoint)
        : active === SIDEBAR_ACTIVE.YES,
    [active, breakpoint]
  );

  const toggleSidebarActivity = useCallback(
    event => {
      event.preventDefault();
      event.stopPropagation();

      setActive(sidebarIsOpen ? SIDEBAR_ACTIVE.NO : SIDEBAR_ACTIVE.YES);
    },
    [sidebarIsOpen]
  );

  return (
    <div
      id="sidebar"
      className={cx(
        {
          inactive: !sidebarIsOpen
        },
        className
      )}
      {...rest}
    >
      <div className="inner">{children}</div>
      <a href="#sidebar" className="toggle" onClick={toggleSidebarActivity}>
        Toggle
      </a>
    </div>
  );
};

export default Sidebar;
