import React from "react";
import { Helmet as Head } from "react-helmet";
import { Global } from "@emotion/core";

import {
  core as fontAwesomeCore,
  usedIcons as fontAwesomeIcons
} from "./global-styles/font-awesome";
import { main as globalEditorialStyles } from "./assets/css/main";

export default ({ sidebar, children }) => {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          href="https://fonts.googleapis.com/css?family=Open+Sans:400,400i,600,600i|Roboto+Slab:400,700"
          rel="stylesheet"
        />
      </Head>
      <Global styles={fontAwesomeCore} />
      <Global styles={fontAwesomeIcons} />
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
