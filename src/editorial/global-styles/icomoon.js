import { css } from "@emotion/core";

export const icomoon = css`
  @font-face {
    font-family: "icomoon";
    src: url("/assets/fonts/icomoon.eot?rbuo6m");
    src: url("/assets/fonts/icomoon.eot?rbuo6m#iefix")
        format("embedded-opentype"),
      url("/assets/fonts/icomoon.ttf?rbuo6m") format("truetype"),
      url("/assets/fonts/icomoon.woff?rbuo6m") format("woff"),
      url("/assets/fonts/icomoon.svg?rbuo6m#icomoon") format("svg");
    font-weight: normal;
    font-style: normal;
  }

  [class^="icon-"],
  [class*=" icon-"] {
    /* use !important to prevent issues with browser extensions that change fonts */
    font-family: "icomoon" !important;
    speak: none;
    font-style: normal;
    font-weight: normal;
    font-variant: normal;
    text-transform: none;
    /* line-height: 1; Disabled because it messes with contact icons */

    /* Better Font Rendering =========== */
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  .icon-twitter:before {
    content: "\f099";
  }
  .icon-github:before {
    content: "\f09b";
  }
  .icon-feed:before {
    content: "\f09e";
  }
  .icon-rss:before {
    content: "\f09e";
  }
  .icon-bars:before {
    content: "\f0c9";
  }
  .icon-navicon:before {
    content: "\f0c9";
  }
  .icon-reorder:before {
    content: "\f0c9";
  }
  .icon-caret-down:before {
    content: "\f0d7";
  }
  .icon-caret-left:before {
    content: "\f0d9";
  }
  .icon-linkedin:before {
    content: "\f0e1";
  }
  .icon-lightbulb-o:before {
    content: "\f0eb";
  }
  .icon-medium:before {
    content: "\f23a";
  }
`;
