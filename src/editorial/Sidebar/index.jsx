import React, { Component } from "react";
import cx from "@sindresorhus/class-names";

import Breakpoint from "../../utils/breakpoints";

export { default as Footer } from "./Footer";
export { default as Header } from "./Header";
export { default as Nav } from "./Nav";
export { default as Section } from "./Section";

export default class Sidebar extends Component {
  state = {
    inactive: undefined
  };

  toggleSidebarActivity = event => {
    event.preventDefault();
    event.stopPropagation();

    this.setState(state => ({
      ...state,
      inactive: !state.inactive
    }));
  };

  render() {
    const { children, className, ...rest } = this.props;
    const { inactive } = this.state;

    return (
      <Breakpoint>
        {breakpoint => (
          <div
            id="sidebar"
            className={cx(
              {
                inactive:
                  typeof inactive !== "undefined"
                    ? inactive
                    : breakpoint !== "xlarge"
              },
              className
            )}
            {...rest}
          >
            <div className="inner">{children}</div>
            <a
              href="#sidebar"
              className="toggle"
              onClick={this.toggleSidebarActivity}
            >
              Toggle
            </a>
          </div>
        )}
      </Breakpoint>
    );
  }
}
