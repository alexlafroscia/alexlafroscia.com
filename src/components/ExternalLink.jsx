import React from "react";

const ExternalLink = ({ children, ...rest }) => (
  <a target="_blank" rel="noopener noreferrer" {...rest}>
    {children}
  </a>
);

export default ExternalLink;
