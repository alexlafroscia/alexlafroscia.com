import React from "react";
import Link from "../elements/a";

const ExternalLink = ({ children, ...rest }) => (
  <Link target="_blank" rel="noopener noreferrer" {...rest}>
    {children}
  </Link>
);

export default ExternalLink;
