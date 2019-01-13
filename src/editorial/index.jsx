import React from "react";
import { Helmet as Head } from "react-helmet";

import "./assets/css/main.css";

export default ({ sidebar, children }) => (
  <>
    <Head>
      <meta charSet="utf-8" />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, user-scalable=no"
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
