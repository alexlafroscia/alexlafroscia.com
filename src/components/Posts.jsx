import React from "react";
import cx from "@sindresorhus/class-names";

export default ({ children, className, ...rest }) => (
  <div className={cx("posts", className)} {...rest}>
    {children}
  </div>
);
