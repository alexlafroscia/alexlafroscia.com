import React, { FC, ReactNode, useCallback, useMemo, useState } from 'react';
import cx from '@sindresorhus/class-names';

import useBreakpoint, { Breakpoint } from '../../hooks/useBreakpoint';

export { default as Footer } from './Footer';
export { default as Header } from './Header';
export { default as Nav } from './Nav';
export { default as Section } from './Section';

type SidebarActions = {
  reset: () => void;
};
type SidebarProps = {
  className?: string;
  children: (actions: SidebarActions) => ReactNode;
};

enum SIDEBAR_ACTIVE {
  'INITIAL',
  'YES',
  'NO'
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
    [setActive, sidebarIsOpen]
  );

  const actions: SidebarActions = useMemo(
    () => ({
      reset: () => setActive(SIDEBAR_ACTIVE.INITIAL)
    }),
    [setActive]
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
      <div className="inner">{children(actions)}</div>
      <a href="#sidebar" className="toggle" onClick={toggleSidebarActivity}>
        Toggle
      </a>
    </div>
  );
};

export default Sidebar;
