import { Component } from "react";

export { default as Footer } from "./Footer";
export { default as Header } from "./Header";
export { default as Nav } from "./Nav";
export { default as Section } from "./Section";

export default class Sidebar extends Component {
  state = {
    inactive: false
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
    const { children } = this.props;
    const { inactive } = this.state;

    return (
      <div id="sidebar" className={inactive ? "inactive" : undefined}>
        <div className="inner">{children}</div>
        <a
          href="#sidebar"
          className="toggle"
          onClick={this.toggleSidebarActivity}
        >
          Toggle
        </a>
      </div>
    );
  }
}
