import React from "react";
import { Helmet as Head } from "react-helmet";
import { Global } from "@emotion/core";

import { icomoon } from "./global-styles/icomoon";
import { main as globalEditorialStyles } from "./global-styles/main";

export default ({ sidebar, children }) => {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Global styles={icomoon} />
      <Global styles={globalEditorialStyles} />
      <div id="wrapper">
        <div id="main">
          <div className="inner">{children}</div>
        </div>

        {sidebar ? sidebar() : undefined}
      </div>
    </>
  );
};
