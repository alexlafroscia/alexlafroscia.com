import React from "react";
import { withPrefix } from "gatsby";
import { Helmet as Head } from "react-helmet";

export default ({ sidebar, children }) => (
  <>
    <Head>
      <meta charSet="utf-8" />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, user-scalable=no"
      />
      <link
        rel="stylesheet"
        href={withPrefix("/editorial/assets/css/main.css")}
      />
    </Head>
    <div id="wrapper">
      <div id="main">
        <div className="inner">{children}</div>
      </div>

      {sidebar ? sidebar() : undefined}
    </div>
  </>
);
