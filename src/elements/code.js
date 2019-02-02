import styled from "@emotion/styled";

import { monospace } from "../theme/font";

import Pre from "./pre";

const Code = styled.code`
  color: var(--theme-darker-text-color);

  /* Highlighted code snippets */
  ${Pre} > &[class*='language-'] {
    color: #d6deeb;
    font-family: Consolas, Monaco, "Andale Mono", "Ubuntu Mono", monospace;
    text-align: left;
    white-space: pre;
    word-spacing: normal;
    word-break: normal;
    word-wrap: normal;
    line-height: 1.5;

    -moz-tab-size: 4;
    -o-tab-size: 4;
    tab-size: 4;

    -webkit-hyphens: none;
    -moz-hyphens: none;
    -ms-hyphens: none;
    hyphens: none;
  }

  /* Inline code blocks */
  *:not(pre) > & {
    font-family: ${monospace};
    font-size: 0.9em;
    font-weight: bold;
  }
`;

export default Code;
