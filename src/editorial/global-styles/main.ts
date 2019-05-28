import { css } from "@emotion/core";
import { sanSerif } from "../../theme/font";

export const main = css`
  html,
  body,
  div,
  span,
  applet,
  object,
  iframe,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p,
  blockquote,
  pre,
  a,
  abbr,
  acronym,
  address,
  big,
  cite,
  code,
  del,
  dfn,
  em,
  img,
  ins,
  kbd,
  q,
  s,
  samp,
  small,
  strike,
  strong,
  sub,
  sup,
  tt,
  var,
  b,
  u,
  i,
  center,
  dl,
  dt,
  dd,
  ol,
  ul,
  li,
  fieldset,
  form,
  label,
  legend,
  table,
  caption,
  tbody,
  tfoot,
  thead,
  tr,
  th,
  td,
  article,
  aside,
  canvas,
  details,
  embed,
  figure,
  figcaption,
  footer,
  header,
  hgroup,
  menu,
  nav,
  output,
  ruby,
  section,
  summary,
  time,
  mark,
  audio,
  video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
  }

  article,
  aside,
  details,
  figcaption,
  figure,
  footer,
  header,
  hgroup,
  menu,
  nav,
  section {
    display: block;
  }

  body {
    line-height: 1;
  }

  ol,
  ul {
    list-style: none;
  }

  blockquote,
  q {
    quotes: none;
  }

  blockquote:before,
  blockquote:after,
  q:before,
  q:after {
    content: "";
    content: none;
  }

  table {
    border-collapse: collapse;
    border-spacing: 0;
  }

  body {
    -webkit-text-size-adjust: none;
  }

  mark {
    background-color: transparent;
    color: inherit;
  }

  input::-moz-focus-inner {
    border: 0;
    padding: 0;
  }

  input,
  select,
  textarea {
    -moz-appearance: none;
    -webkit-appearance: none;
    -ms-appearance: none;
    appearance: none;
  }

  body {
    -ms-overflow-style: scrollbar;
  }

  @media screen and (max-width: 480px) {
    html,
    body {
      min-width: 320px;
    }
  }

  html {
    box-sizing: border-box;
  }

  *,
  *:before,
  *:after {
    box-sizing: inherit;
  }

  body {
    background: #ffffff;
  }

  body.is-preload *,
  body.is-preload *:before,
  body.is-preload *:after,
  body.is-resizing *,
  body.is-resizing *:before,
  body.is-resizing *:after {
    -moz-animation: none !important;
    -webkit-animation: none !important;
    -ms-animation: none !important;
    animation: none !important;
    -moz-transition: none !important;
    -webkit-transition: none !important;
    -ms-transition: none !important;
    transition: none !important;
  }

  body,
  input,
  select,
  textarea {
    color: var(--theme-primary-text-color, #7f888f);
    font-family: ${sanSerif};
    font-size: 13pt;
    font-weight: 400;
    line-height: 1.65;
  }

  @media screen and (max-width: 1680px) {
    body,
    input,
    select,
    textarea {
      font-size: 11pt;
    }
  }

  @media screen and (max-width: 1280px) {
    body,
    input,
    select,
    textarea {
      font-size: 10pt;
    }
  }

  @media screen and (max-width: 360px) {
    body,
    input,
    select,
    textarea {
      font-size: 9pt;
    }
  }

  a {
    -moz-transition: color 0.2s ease-in-out,
      border-bottom-color 0.2s ease-in-out;
    -webkit-transition: color 0.2s ease-in-out,
      border-bottom-color 0.2s ease-in-out;
    -ms-transition: color 0.2s ease-in-out, border-bottom-color 0.2s ease-in-out;
    transition: color 0.2s ease-in-out, border-bottom-color 0.2s ease-in-out;
    border-bottom: dotted 1px;
    color: var(--theme-accent-color, #f56a6a);
    text-decoration: none;
  }

  a:hover {
    border-bottom-color: var(--theme-accent-color, #f56a6a);
    color: var(--theme-accent-color, #f56a6a) !important;
  }

  a:hover strong {
    color: inherit;
  }

  strong,
  b {
    color: var(--theme-darker-text-color, #3d4449);
    font-weight: 600;
  }

  em,
  i {
    font-style: italic;
  }

  p {
    margin: 0 0 2em 0;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    color: var(--theme-darker-text-color, #3d4449);
    font-weight: 700;
    line-height: 1.5;
    margin: 0 0 1em 0;
  }

  h1 a,
  h2 a,
  h3 a,
  h4 a,
  h5 a,
  h6 a {
    color: inherit;
    text-decoration: none;
    border-bottom: 0;
  }

  h1 {
    font-size: 4em;
    margin: 0 0 0.5em 0;
    line-height: 1.3;
  }

  h2 {
    font-size: 1.75em;
  }

  h3 {
    font-size: 1.25em;
  }

  h4 {
    font-size: 1.1em;
  }

  h5 {
    font-size: 0.9em;
  }

  h6 {
    font-size: 0.7em;
  }

  @media screen and (max-width: 1680px) {
    h1 {
      font-size: 3.5em;
    }
  }

  @media screen and (max-width: 980px) {
    h1 {
      font-size: 3.25em;
    }
  }

  @media screen and (max-width: 736px) {
    h1 {
      font-size: 2em;
      line-height: 1.4;
    }

    h2 {
      font-size: 1.5em;
    }
  }

  sub {
    font-size: 0.8em;
    position: relative;
    top: 0.5em;
  }

  sup {
    font-size: 0.8em;
    position: relative;
    top: -0.5em;
  }

  blockquote {
    border-left: solid 3px var(--theme-divider-color);
    font-style: italic;
    margin: 0 0 2em 0;
    padding: 0.5em 0 0.5em 2em;
  }

  pre {
    -webkit-overflow-scrolling: touch;
    font-size: 0.9em;
    margin: 0 0 2em 0;
  }

  pre code {
    display: block;
    line-height: 1.75;
    padding: 1em 1.5em;
    overflow-x: auto;
  }

  hr {
    border: 0;
    border-bottom: solid 1px var(--theme-divider-color);
    margin: 2em 0;
  }

  hr.major {
    margin: 3em 0;
  }

  .align-left {
    text-align: left;
  }

  .align-center {
    text-align: center;
  }

  .align-right {
    text-align: right;
  }

  section.special,
  article.special {
    text-align: center;
  }

  header p {
    font-size: 1em;
    font-weight: 400;
    letter-spacing: 0.075em;
    margin-top: -0.5em;
    text-transform: uppercase;
  }

  header.major > :last-child {
    border-bottom: solid 3px var(--theme-accent-color, #f56a6a);
    display: inline-block;
    margin: 0 0 2em 0;
    padding: 0 0.75em 0.5em 0;
  }

  header.main > :last-child {
    margin: 0 0 1em 0;
  }

  form {
    margin: 0 0 2em 0;
  }

  label {
    color: var(--theme-darker-text-color, #3d4449);
    display: block;
    font-size: 0.9em;
    font-weight: 600;
    margin: 0 0 1em 0;
  }

  input[type="text"],
  input[type="password"],
  input[type="email"],
  input[type="tel"],
  input[type="search"],
  input[type="url"],
  select,
  textarea {
    -moz-appearance: none;
    -webkit-appearance: none;
    -ms-appearance: none;
    appearance: none;
    background: #ffffff;
    border-radius: 0.375em;
    border: none;
    border: solid 1px var(--theme-divider-color);
    color: inherit;
    display: block;
    outline: 0;
    padding: 0 1em;
    text-decoration: none;
    width: 100%;
  }

  input[type="text"]:invalid,
  input[type="password"]:invalid,
  input[type="email"]:invalid,
  input[type="tel"]:invalid,
  input[type="search"]:invalid,
  input[type="url"]:invalid,
  select:invalid,
  textarea:invalid {
    box-shadow: none;
  }

  input[type="text"]:focus,
  input[type="password"]:focus,
  input[type="email"]:focus,
  input[type="tel"]:focus,
  input[type="search"]:focus,
  input[type="url"]:focus,
  select:focus,
  textarea:focus {
    border-color: var(--theme-accent-color, #f56a6a);
    box-shadow: 0 0 0 1px var(--theme-accent-color, #f56a6a);
  }

  select {
    background-image: url("data:text/plain;charset=utf-8;base64,ZGF0YTppbWFnZS9zdmcreG1sO2NoYXJzZXQ9dXRmOCwlM0NzdmcgeG1sbnM9J2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJyB3aWR0aD0nNDAnIGhlaWdodD0nNDAnIHByZXNlcnZlQXNwZWN0UmF0aW89J25vbmUnIHZpZXdCb3g9JzAgMCA0MCA0MCclM0UlM0NwYXRoIGQ9J005LjQsMTIuM2wxMC40LDEwLjRsMTAuNC0xMC40YzAuMi0wLjIsMC41LTAuNCwwLjktMC40YzAuMywwLDAuNiwwLjEsMC45LDAuNGwzLjMsMy4zYzAuMiwwLjIsMC40LDAuNSwwLjQsMC45IGMwLDAuNC0wLjEsMC42LTAuNCwwLjlMMjAuNywzMS45Yy0wLjIsMC4yLTAuNSwwLjQtMC45LDAuNGMtMC4zLDAtMC42LTAuMS0wLjktMC40TDQuMywxNy4zYy0wLjItMC4yLTAuNC0wLjUtMC40LTAuOSBjMC0wLjQsMC4xLTAuNiwwLjQtMC45bDMuMy0zLjNjMC4yLTAuMiwwLjUtMC40LDAuOS0wLjRTOS4xLDEyLjEsOS40LDEyLjN6JyBmaWxsPSdyZ2JhKDIxMCwgMjE1LCAyMTcsIDAuNzUpJyAvJTNFJTNDL3N2ZyUzRQ==");
    background-size: 1.25em;
    background-repeat: no-repeat;
    background-position: calc(100% - 1em) center;
    height: 2.75em;
    padding-right: 2.75em;
    text-overflow: ellipsis;
  }

  select option {
    color: var(--theme-darker-text-color, #3d4449);
    background: #ffffff;
  }

  select:focus::-ms-value {
    background-color: transparent;
  }

  select::-ms-expand {
    display: none;
  }

  input[type="text"],
  input[type="password"],
  input[type="email"],
  input[type="tel"],
  input[type="search"],
  input[type="url"],
  select {
    height: 2.75em;
  }

  textarea {
    padding: 0.75em 1em;
  }

  input[type="checkbox"],
  input[type="radio"] {
    -moz-appearance: none;
    -webkit-appearance: none;
    -ms-appearance: none;
    appearance: none;
    display: block;
    float: left;
    margin-right: -2em;
    opacity: 0;
    width: 1em;
    z-index: -1;
  }

  input[type="checkbox"] + label,
  input[type="radio"] + label {
    text-decoration: none;
    color: var(--theme-primary-text-color, #7f888f);
    cursor: pointer;
    display: inline-block;
    font-size: 1em;
    font-weight: 400;
    padding-left: 2.4em;
    padding-right: 0.75em;
    position: relative;
  }

  input[type="checkbox"] + label:before,
  input[type="radio"] + label:before {
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    font-family: icomoon;
    font-style: normal;
    font-weight: normal;
    text-transform: none !important;
  }

  input[type="checkbox"] + label:before,
  input[type="radio"] + label:before {
    background: #ffffff;
    border-radius: 0.375em;
    border: solid 1px var(--theme-divider-color);
    content: "";
    display: inline-block;
    height: 1.65em;
    left: 0;
    line-height: 1.58125em;
    position: absolute;
    text-align: center;
    top: 0;
    width: 1.65em;
  }

  input[type="checkbox"]:checked + label:before,
  input[type="radio"]:checked + label:before {
    background: var(--theme-darker-text-color, #3d4449);
    border-color: var(--theme-darker-text-color, #3d4449);
    color: #ffffff;
    content: "\f00c";
  }

  input[type="checkbox"]:focus + label:before,
  input[type="radio"]:focus + label:before {
    border-color: var(--theme-accent-color, #f56a6a);
    box-shadow: 0 0 0 1px var(--theme-accent-color, #f56a6a);
  }

  input[type="checkbox"] + label:before {
    border-radius: 0.375em;
  }

  input[type="radio"] + label:before {
    border-radius: 100%;
  }

  ::-webkit-input-placeholder {
    color: #9fa3a6 !important;
    opacity: 1;
  }

  :-moz-placeholder {
    color: #9fa3a6 !important;
    opacity: 1;
  }

  ::-moz-placeholder {
    color: #9fa3a6 !important;
    opacity: 1;
  }

  :-ms-input-placeholder {
    color: #9fa3a6 !important;
    opacity: 1;
  }

  .box {
    border-radius: 0.375em;
    border: solid 1px var(--theme-divider-color);
    margin-bottom: 2em;
    padding: 1.5em;
  }

  .box > :last-child,
  .box > :last-child > :last-child,
  .box > :last-child > :last-child > :last-child {
    margin-bottom: 0;
  }

  .box.alt {
    border: 0;
    border-radius: 0;
    padding: 0;
  }

  .icon {
    text-decoration: none;
    border-bottom: none;
    position: relative;
  }

  .icon:before {
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    font-family: icomoon;
    font-style: normal;
    font-weight: normal;
    text-transform: none !important;
  }

  .icon > .label {
    display: none;
  }

  .image {
    border-radius: 0.375em;
    border: 0;
    display: inline-block;
    position: relative;
  }

  .image img {
    border-radius: 0.375em;
    display: block;
  }

  .image.left,
  .image.right {
    max-width: 40%;
  }

  .image.left img,
  .image.right img {
    width: 100%;
  }

  .image.left {
    float: left;
    padding: 0 1.5em 1em 0;
    top: 0.25em;
  }

  .image.right {
    float: right;
    padding: 0 0 1em 1.5em;
    top: 0.25em;
  }

  .image.fit {
    display: block;
    margin: 0 0 2em 0;
    width: 100%;
  }

  .image.fit img {
    width: 100%;
  }

  .image.main {
    display: block;
    margin: 0 0 3em 0;
    width: 100%;
  }

  .image.main img {
    width: 100%;
  }

  a.image {
    overflow: hidden;
  }

  a.image img {
    -moz-transition: -moz-transform 0.2s ease;
    -webkit-transition: -webkit-transform 0.2s ease;
    -ms-transition: -ms-transform 0.2s ease;
    transition: transform 0.2s ease;
  }

  a.image:hover img {
    -moz-transform: scale(1.075);
    -webkit-transform: scale(1.075);
    -ms-transform: scale(1.075);
    transform: scale(1.075);
  }

  ol {
    list-style: decimal;
    margin: 0 0 2em 0;
    padding-left: 1.25em;
  }

  ol li {
    padding-left: 0.25em;
  }

  ul {
    list-style: disc;
    margin: 0 0 2em 0;
    padding-left: 1em;
  }

  ul li {
    padding-left: 0.5em;
  }

  ul.alt {
    list-style: none;
    padding-left: 0;
  }

  ul.alt li {
    border-top: solid 1px var(--theme-divider-color);
    padding: 0.5em 0;
  }

  ul.alt li:first-of-type {
    border-top: 0;
    padding-top: 0;
  }

  dl {
    margin: 0 0 2em 0;
  }

  dl dt {
    display: block;
    font-weight: 600;
    margin: 0 0 1em 0;
  }

  dl dd {
    margin-left: 2em;
  }

  ul.actions {
    display: -moz-flex;
    display: -webkit-flex;
    display: -ms-flex;
    display: flex;
    cursor: default;
    list-style: none;
    margin-left: -1em;
    padding-left: 0;
  }

  ul.actions li {
    padding: 0 0 0 1em;
    vertical-align: middle;
  }

  ul.actions.special {
    -moz-justify-content: center;
    -webkit-justify-content: center;
    -ms-justify-content: center;
    justify-content: center;
    width: 100%;
    margin-left: 0;
  }

  ul.actions.special li:first-of-type {
    padding-left: 0;
  }

  ul.actions.stacked {
    -moz-flex-direction: column;
    -webkit-flex-direction: column;
    -ms-flex-direction: column;
    flex-direction: column;
    margin-left: 0;
  }

  ul.actions.stacked li {
    padding: 1.3em 0 0 0;
  }

  ul.actions.stacked li:first-of-type {
    padding-top: 0;
  }

  ul.actions.fit {
    width: calc(100% + 1em);
  }

  ul.actions.fit li {
    -moz-flex-grow: 1;
    -webkit-flex-grow: 1;
    -ms-flex-grow: 1;
    flex-grow: 1;
    -moz-flex-shrink: 1;
    -webkit-flex-shrink: 1;
    -ms-flex-shrink: 1;
    flex-shrink: 1;
    width: 100%;
  }

  ul.actions.fit li > * {
    width: 100%;
  }

  ul.actions.fit.stacked {
    width: 100%;
  }

  ul.icons {
    cursor: default;
    list-style: none;
    padding-left: 0;
  }

  ul.icons li {
    display: inline-block;
    padding: 0 1em 0 0;
  }

  ul.icons li:last-child {
    padding-right: 0;
  }

  ul.icons li .icon {
    color: inherit;
  }

  ul.icons li .icon:before {
    font-size: 1.25em;
  }

  ul.pagination {
    cursor: default;
    list-style: none;
    padding-left: 0;
  }

  ul.pagination li {
    display: inline-block;
    padding-left: 0;
    vertical-align: middle;
  }

  ul.pagination li > .page {
    -moz-transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out;
    -webkit-transition: background-color 0.2s ease-in-out,
      color 0.2s ease-in-out;
    -ms-transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out;
    transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out;
    border-bottom: 0;
    border-radius: 0.375em;
    display: inline-block;
    font-size: 0.8em;
    font-weight: 600;
    height: 2em;
    line-height: 2em;
    margin: 0 0.125em;
    min-width: 2em;
    padding: 0 0.5em;
    text-align: center;
  }

  ul.pagination li > .page.active {
    background-color: var(--theme-accent-color, #f56a6a);
    color: #ffffff !important;
  }

  ul.pagination li > .page.active:hover {
    background-color: #f67878;
  }

  ul.pagination li > .page.active:active {
    background-color: #f45c5c;
  }

  ul.pagination li:first-of-type {
    padding-right: 0.75em;
  }

  ul.pagination li:last-child {
    padding-left: 0.75em;
  }

  @media screen and (max-width: 480px) {
    ul.pagination li:nth-of-type(n + 2):nth-last-of-type(n + 2) {
      display: none;
    }

    ul.pagination li:first-of-type {
      padding-right: 0;
    }
  }

  .table-wrapper {
    -webkit-overflow-scrolling: touch;
    overflow-x: auto;
  }

  table {
    margin: 0 0 2em 0;
    width: 100%;
  }

  table tbody tr {
    border: solid 1px var(--theme-divider-color);
    border-left: 0;
    border-right: 0;
  }

  table tbody tr:nth-of-type(2n + 1) {
    background-color: rgba(230, 235, 237, 0.25);
  }

  table td {
    padding: 0.75em 0.75em;
  }

  table th {
    color: var(--theme-darker-text-color, #3d4449);
    font-size: 0.9em;
    font-weight: 600;
    padding: 0 0.75em 0.75em 0.75em;
    text-align: left;
  }

  table thead {
    border-bottom: solid 2px var(--theme-divider-color);
  }

  table tfoot {
    border-top: solid 2px var(--theme-divider-color);
  }

  table.alt {
    border-collapse: separate;
  }

  table.alt tbody tr td {
    border: solid 1px var(--theme-divider-color);
    border-left-width: 0;
    border-top-width: 0;
  }

  table.alt tbody tr td:first-of-type {
    border-left-width: 1px;
  }

  table.alt tbody tr:first-of-type td {
    border-top-width: 1px;
  }

  table.alt thead {
    border-bottom: 0;
  }

  table.alt tfoot {
    border-top: 0;
  }

  input[type="submit"],
  input[type="reset"],
  input[type="button"],
  button,
  .button {
    -moz-appearance: none;
    -webkit-appearance: none;
    -ms-appearance: none;
    appearance: none;
    -moz-transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out;
    -webkit-transition: background-color 0.2s ease-in-out,
      color 0.2s ease-in-out;
    -ms-transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out;
    transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out;
    background-color: transparent;
    border-radius: 0.375em;
    border: 0;
    box-shadow: inset 0 0 0 2px var(--theme-accent-color, #f56a6a);
    color: var(--theme-accent-color, #f56a6a) !important;
    cursor: pointer;
    display: inline-block;
    font-size: 0.8em;
    font-weight: 700;
    height: 3.5em;
    letter-spacing: 0.075em;
    line-height: 3.5em;
    padding: 0 2.25em;
    text-align: center;
    text-decoration: none;
    text-transform: uppercase;
    white-space: nowrap;
  }

  input[type="submit"]:hover,
  input[type="reset"]:hover,
  input[type="button"]:hover,
  button:hover,
  .button:hover {
    background-color: rgba(245, 106, 106, 0.05);
  }

  input[type="submit"]:active,
  input[type="reset"]:active,
  input[type="button"]:active,
  button:active,
  .button:active {
    background-color: rgba(245, 106, 106, 0.15);
  }

  input[type="submit"].icon:before,
  input[type="reset"].icon:before,
  input[type="button"].icon:before,
  button.icon:before,
  .button.icon:before {
    margin-right: 0.5em;
  }

  input[type="submit"].fit,
  input[type="reset"].fit,
  input[type="button"].fit,
  button.fit,
  .button.fit {
    width: 100%;
  }

  input[type="submit"].small,
  input[type="reset"].small,
  input[type="button"].small,
  button.small,
  .button.small {
    font-size: 0.6em;
  }

  input[type="submit"].large,
  input[type="reset"].large,
  input[type="button"].large,
  button.large,
  .button.large {
    font-size: 1em;
    height: 3.65em;
    line-height: 3.65em;
  }

  input[type="submit"].primary,
  input[type="reset"].primary,
  input[type="button"].primary,
  button.primary,
  .button.primary {
    background-color: var(--theme-accent-color, #f56a6a);
    box-shadow: none;
    color: #ffffff !important;
  }

  input[type="submit"].primary:hover,
  input[type="reset"].primary:hover,
  input[type="button"].primary:hover,
  button.primary:hover,
  .button.primary:hover {
    background-color: #f67878;
  }

  input[type="submit"].primary:active,
  input[type="reset"].primary:active,
  input[type="button"].primary:active,
  button.primary:active,
  .button.primary:active {
    background-color: #f45c5c;
  }

  input[type="submit"].disabled,
  input[type="submit"]:disabled,
  input[type="reset"].disabled,
  input[type="reset"]:disabled,
  input[type="button"].disabled,
  input[type="button"]:disabled,
  button.disabled,
  button:disabled,
  .button.disabled,
  .button:disabled {
    pointer-events: none;
    opacity: 0.25;
  }

  .posts {
    display: -moz-flex;
    display: -webkit-flex;
    display: -ms-flex;
    display: flex;
    -moz-flex-wrap: wrap;
    -webkit-flex-wrap: wrap;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
    margin: 0 0 2em -6em;
    width: calc(100% + 6em);
  }

  .posts article {
    -moz-flex-grow: 0;
    -webkit-flex-grow: 0;
    -ms-flex-grow: 0;
    flex-grow: 0;
    -moz-flex-shrink: 1;
    -webkit-flex-shrink: 1;
    -ms-flex-shrink: 1;
    flex-shrink: 1;
    margin: 0 0 6em 6em;
    position: relative;
    width: calc(33.3333333333% - 6em);
  }

  .posts article:before {
    background: var(--theme-divider-color);
    content: "";
    display: block;
    height: calc(100% + 6em);
    left: -3em;
    position: absolute;
    top: 0;
    width: 1px;
  }

  .posts article:after {
    background: var(--theme-divider-color);
    bottom: -3em;
    content: "";
    display: block;
    height: 1px;
    position: absolute;
    right: 0;
    width: calc(100% + 6em);
  }

  .posts article > :last-child {
    margin-bottom: 0;
  }

  .posts article .image {
    display: block;
    margin: 0 0 2em 0;
  }

  .posts article .image img {
    display: block;
    width: 100%;
  }

  @media screen and (min-width: 1681px) {
    .posts article:nth-of-type(3n + 1):before {
      display: none;
    }

    .posts article:nth-of-type(3n + 1):after {
      width: 100%;
    }

    .posts article:nth-last-of-type(1),
    .posts article:nth-last-of-type(2),
    .posts article:nth-last-of-type(3) {
      margin-bottom: 0;
    }

    .posts article:nth-last-of-type(1):before,
    .posts article:nth-last-of-type(2):before,
    .posts article:nth-last-of-type(3):before {
      height: 100%;
    }

    .posts article:nth-last-of-type(1):after,
    .posts article:nth-last-of-type(2):after,
    .posts article:nth-last-of-type(3):after {
      display: none;
    }
  }

  @media screen and (max-width: 1680px) {
    .posts article {
      width: calc(50% - 6em);
    }

    .posts article:nth-last-of-type(3) {
      margin-bottom: 6em;
    }
  }

  @media screen and (min-width: 481px) and (max-width: 1680px) {
    .posts article:nth-of-type(2n + 1):before {
      display: none;
    }

    .posts article:nth-of-type(2n + 1):after {
      width: 100%;
    }

    .posts article:nth-last-of-type(1),
    .posts article:nth-last-of-type(2) {
      margin-bottom: 0;
    }

    .posts article:nth-last-of-type(1):before,
    .posts article:nth-last-of-type(2):before {
      height: 100%;
    }

    .posts article:nth-last-of-type(1):after,
    .posts article:nth-last-of-type(2):after {
      display: none;
    }
  }

  @media screen and (max-width: 736px) {
    .posts {
      margin: 0 0 2em -4.5em;
      width: calc(100% + 4.5em);
    }

    .posts article {
      margin: 0 0 4.5em 4.5em;
      width: calc(50% - 4.5em);
    }

    .posts article:before {
      height: calc(100% + 4.5em);
      left: -2.25em;
    }

    .posts article:after {
      bottom: -2.25em;
      width: calc(100% + 4.5em);
    }

    .posts article:nth-last-of-type(3) {
      margin-bottom: 4.5em;
    }
  }

  @media screen and (max-width: 480px) {
    .posts {
      margin: 0 0 2em 0;
      width: 100%;
    }

    .posts article {
      margin: 0 0 4.5em 0;
      width: 100%;
    }

    .posts article:before {
      display: none;
    }

    .posts article:after {
      width: 100%;
    }

    .posts article:last-child {
      margin-bottom: 0;
    }

    .posts article:last-child:after {
      display: none;
    }
  }

  #wrapper {
    display: -moz-flex;
    display: -webkit-flex;
    display: -ms-flex;
    display: flex;
    -moz-flex-direction: row-reverse;
    -webkit-flex-direction: row-reverse;
    -ms-flex-direction: row-reverse;
    flex-direction: row-reverse;
    min-height: 100vh;
  }

  #main {
    -moz-flex-grow: 1;
    -webkit-flex-grow: 1;
    -ms-flex-grow: 1;
    flex-grow: 1;
    -moz-flex-shrink: 1;
    -webkit-flex-shrink: 1;
    -ms-flex-shrink: 1;
    flex-shrink: 1;
    width: 100%;
  }

  #main > .inner {
    padding: 0 6em 0.1em 6em;
    margin: 0 auto;
    max-width: 110em;
  }

  #main > .inner > section {
    padding: 6em 0 4em 0;
    border-top: solid 2px var(--theme-divider-color);
  }

  #main > .inner > section:first-of-type {
    border-top: 0 !important;
  }

  @media screen and (max-width: 1680px) {
    #main > .inner {
      padding: 0 5em 0.1em 5em;
    }

    #main > .inner > section {
      padding: 5em 0 3em 0;
    }
  }

  @media screen and (max-width: 1280px) {
    #main > .inner {
      padding: 0 4em 0.1em 4em;
    }

    #main > .inner > section {
      padding: 4em 0 2em 0;
    }
  }

  @media screen and (max-width: 736px) {
    #main > .inner {
      padding: 0 2em 0.1em 2em;
    }

    #main > .inner > section {
      padding: 3em 0 1em 0;
    }
  }

  #search form {
    text-decoration: none;
    position: relative;
  }

  #search form:before {
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    font-family: icomoon;
    font-style: normal;
    font-weight: normal;
    text-transform: none !important;
  }

  #search form:before {
    -moz-transform: scaleX(-1);
    -webkit-transform: scaleX(-1);
    -ms-transform: scaleX(-1);
    transform: scaleX(-1);
    color: var(--theme-primary-text-color, #7f888f);
    content: "\f002";
    cursor: default;
    display: block;
    font-size: 1.5em;
    height: 2em;
    line-height: 2em;
    opacity: 0.325;
    position: absolute;
    right: 0;
    text-align: center;
    top: 0;
    width: 2em;
  }

  #search form input[type="text"] {
    padding-right: 2.75em;
  }

  #sidebar {
    -moz-flex-grow: 0;
    -webkit-flex-grow: 0;
    -ms-flex-grow: 0;
    flex-grow: 0;
    -moz-flex-shrink: 0;
    -webkit-flex-shrink: 0;
    -ms-flex-shrink: 0;
    flex-shrink: 0;
    -moz-transition: margin-left 0.5s ease, box-shadow 0.5s ease;
    -webkit-transition: margin-left 0.5s ease, box-shadow 0.5s ease;
    -ms-transition: margin-left 0.5s ease, box-shadow 0.5s ease;
    transition: margin-left 0.5s ease, box-shadow 0.5s ease;
    background-color: var(--theme-secondary-background-color, #f5f6f7);
    font-size: 0.9em;
    position: relative;
    width: 26em;
  }

  #sidebar h2 {
    font-size: 1.3888888889em;
  }

  #sidebar > .inner {
    padding: 2.2222222222em 2.2222222222em 2.4444444444em 2.2222222222em;
    position: relative;
    width: 26em;
  }

  #sidebar > .inner > * {
    border-bottom: solid 2px var(--theme-divider-color);
    margin: 0 0 3.5em 0;
    padding: 0 0 3.5em 0;
  }

  #sidebar > .inner > * > :last-child {
    margin-bottom: 0;
  }

  #sidebar > .inner > *:last-child {
    border-bottom: 0;
    margin-bottom: 0;
    padding-bottom: 0;
  }

  #sidebar > .inner > .alt {
    background-color: #eff1f2;
    border-bottom: 0;
    margin: -2.2222222222em 0 4.4444444444em -2.2222222222em;
    padding: 2.2222222222em;
    width: calc(100% + 4.4444444444em);
  }

  #sidebar .toggle {
    text-decoration: none;
    -moz-transition: left 0.5s ease;
    -webkit-transition: left 0.5s ease;
    -ms-transition: left 0.5s ease;
    transition: left 0.5s ease;
    -webkit-tap-highlight-color: rgba(255, 255, 255, 0);
    border: 0;
    display: block;
    height: 7.5em;
    left: 26em;
    line-height: 7.5em;
    outline: 0;
    overflow: hidden;
    position: absolute;
    text-align: center;
    text-indent: 7.5em;
    top: 0;
    width: 6em;
    z-index: 10000;
  }

  #sidebar .toggle:before {
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    font-family: icomoon;
    font-style: normal;
    font-weight: normal;
    text-transform: none !important;
  }

  #sidebar .toggle:before {
    content: "\f0c9";
    font-size: 2rem;
    height: inherit;
    left: 0;
    line-height: inherit;
    position: absolute;
    text-indent: 0;
    top: 0;
    width: inherit;
  }

  #sidebar.inactive {
    margin-left: -26em;
  }

  @media screen and (max-width: 1680px) {
    #sidebar {
      width: 24em;
    }

    #sidebar > .inner {
      padding: 1.6666666667em 1.6666666667em 1.3333333333em 1.6666666667em;
      width: 24em;
    }

    #sidebar > .inner > .alt {
      margin: -1.6666666667em 0 3.3333333333em -1.6666666667em;
      padding: 1.6666666667em;
      width: calc(100% + 3.3333333333em);
    }

    #sidebar .toggle {
      height: 6.25em;
      left: 24em;
      line-height: 6.25em;
      text-indent: 5em;
      width: 5em;
    }

    #sidebar .toggle:before {
      font-size: 1.5rem;
    }

    #sidebar.inactive {
      margin-left: -24em;
    }
  }

  @media screen and (max-width: 1280px) {
    #sidebar {
      box-shadow: 0 0 5em 0 rgba(0, 0, 0, 0.175);
      height: 100%;
      left: 0;
      position: fixed;
      top: 0;
      z-index: 10000;
    }

    #sidebar.inactive {
      box-shadow: none;
    }

    #sidebar > .inner {
      -webkit-overflow-scrolling: touch;
      height: 100%;
      left: 0;
      overflow-x: hidden;
      overflow-y: auto;
      position: absolute;
      top: 0;
    }

    #sidebar > .inner:after {
      content: "";
      display: block;
      height: 4em;
      width: 100%;
    }

    #sidebar .toggle {
      text-indent: 6em;
      width: 6em;
    }

    #sidebar .toggle:before {
      font-size: 1.5rem;
      margin-left: -0.4375em;
    }

    body.is-preload #sidebar {
      display: none;
    }
  }

  @media screen and (max-width: 736px) {
    #sidebar .toggle {
      text-indent: 7.25em;
      width: 7.25em;
    }

    #sidebar .toggle:before {
      color: var(--theme-primary-text-color, #7f888f);
      margin-left: -0.0625em;
      margin-top: -0.25em;
      font-size: 1.1rem;
      z-index: 1;
    }

    #sidebar .toggle:after {
      background: var(--theme-secondary-background-color);
      border-radius: 0.375em;
      content: "";
      height: 3.5em;
      left: 1em;
      position: absolute;
      top: 1em;
      width: 5em;
    }
  }

  #header {
    display: -moz-flex;
    display: -webkit-flex;
    display: -ms-flex;
    display: flex;
    border-bottom: solid 5px var(--theme-accent-color, #f56a6a);
    padding: 6em 0 1em 0;
    position: relative;
  }

  #header > * {
    -moz-flex: 1;
    -webkit-flex: 1;
    -ms-flex: 1;
    flex: 1;
    margin-bottom: 0;
  }

  #header .logo {
    border-bottom: 0;
    color: inherit;
    font-size: 1.125em;
  }

  #header .icons {
    text-align: right;
  }

  @media screen and (max-width: 1680px) {
    #header {
      padding-top: 5em;
    }
  }

  @media screen and (max-width: 736px) {
    #header {
      padding-top: 6.5em;
    }

    #header .logo {
      font-size: 1.25em;
      margin: 0;
    }

    #header .icons {
      height: 5em;
      line-height: 5em;
      position: absolute;
      right: -0.5em;
      top: 0;
    }
  }

  #banner {
    padding: 6em 0 4em 0;
    display: -moz-flex;
    display: -webkit-flex;
    display: -ms-flex;
    display: flex;
  }

  #banner h1 {
    margin-top: -0.125em;
  }

  #banner .content {
    -moz-flex-grow: 1;
    -webkit-flex-grow: 1;
    -ms-flex-grow: 1;
    flex-grow: 1;
    -moz-flex-shrink: 1;
    -webkit-flex-shrink: 1;
    -ms-flex-shrink: 1;
    flex-shrink: 1;
    width: 50%;
  }

  #banner .image {
    -moz-flex-grow: 0;
    -webkit-flex-grow: 0;
    -ms-flex-grow: 0;
    flex-grow: 0;
    -moz-flex-shrink: 0;
    -webkit-flex-shrink: 0;
    -ms-flex-shrink: 0;
    flex-shrink: 0;
    display: block;
    margin: 0 0 2em 4em;
    width: 50%;
  }

  #banner .image img {
    height: 100%;
    -moz-object-fit: cover;
    -webkit-object-fit: cover;
    -ms-object-fit: cover;
    object-fit: cover;
    -moz-object-position: center;
    -webkit-object-position: center;
    -ms-object-position: center;
    object-position: center;
    width: 100%;
  }

  @media screen and (orientation: portrait) {
    #banner {
      -moz-flex-direction: column-reverse;
      -webkit-flex-direction: column-reverse;
      -ms-flex-direction: column-reverse;
      flex-direction: column-reverse;
    }

    #banner h1 br {
      display: none;
    }

    #banner .content {
      -moz-flex-grow: 0;
      -webkit-flex-grow: 0;
      -ms-flex-grow: 0;
      flex-grow: 0;
      -moz-flex-shrink: 0;
      -webkit-flex-shrink: 0;
      -ms-flex-shrink: 0;
      flex-shrink: 0;
      width: 100%;
    }

    #banner .image {
      -moz-flex-grow: 0;
      -webkit-flex-grow: 0;
      -ms-flex-grow: 0;
      flex-grow: 0;
      -moz-flex-shrink: 0;
      -webkit-flex-shrink: 0;
      -ms-flex-shrink: 0;
      flex-shrink: 0;
      margin: 0 0 4em 0;
      height: 25em;
      max-height: 50vh;
      min-height: 18em;
      width: 100%;
    }
  }

  @media screen and (orientation: portrait) and (max-width: 480px) {
    #banner .image {
      max-height: 35vh;
    }
  }

  #footer .copyright {
    color: #9fa3a6;
    font-size: 0.9em;
  }

  #footer .copyright a {
    color: inherit;
  }

  #menu ul {
    -moz-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
    user-select: none;
    color: var(--theme-darker-text-color, #3d4449);
    letter-spacing: 0.075em;
    list-style: none;
    margin-bottom: 0;
    padding: 0;
    text-transform: uppercase;
  }

  #menu ul a,
  #menu ul span {
    border-bottom: 0;
    color: inherit;
    cursor: pointer;
    display: block;
    font-size: 0.9em;
    padding: 0.625em 0;
  }

  #menu ul a:hover,
  #menu ul span:hover {
    color: var(--theme-accent-color, #f56a6a);
  }

  #menu ul a.opener,
  #menu ul span.opener {
    -moz-transition: color 0.2s ease-in-out;
    -webkit-transition: color 0.2s ease-in-out;
    -ms-transition: color 0.2s ease-in-out;
    transition: color 0.2s ease-in-out;
    text-decoration: none;
    -webkit-tap-highlight-color: rgba(255, 255, 255, 0);
    position: relative;
  }

  #menu ul a.opener:before,
  #menu ul span.opener:before {
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    font-family: icomoon;
    font-style: normal;
    font-weight: normal;
    text-transform: none !important;
  }

  #menu ul a.opener:before,
  #menu ul span.opener:before {
    -moz-transition: color 0.2s ease-in-out, -moz-transform 0.2s ease-in-out;
    -webkit-transition: color 0.2s ease-in-out,
      -webkit-transform 0.2s ease-in-out;
    -ms-transition: color 0.2s ease-in-out, -ms-transform 0.2s ease-in-out;
    transition: color 0.2s ease-in-out, transform 0.2s ease-in-out;
    color: #9fa3a6;
    content: "\f078";
    position: absolute;
    right: 0;
  }

  #menu ul a.opener:hover:before,
  #menu ul span.opener:hover:before {
    color: var(--theme-accent-color, #f56a6a);
  }

  #menu ul a.opener.active + ul,
  #menu ul span.opener.active + ul {
    display: block;
  }

  #menu ul a.opener.active:before,
  #menu ul span.opener.active:before {
    -moz-transform: rotate(-180deg);
    -webkit-transform: rotate(-180deg);
    -ms-transform: rotate(-180deg);
    transform: rotate(-180deg);
  }

  #menu > ul > li {
    border-top: solid 1px var(--theme-divider-color);
    margin: 0.5em 0 0 0;
    padding: 0.5em 0 0 0;
  }

  #menu > ul > li > ul {
    color: #9fa3a6;
    display: none;
    margin: 0.5em 0 1.5em 0;
    padding-left: 1em;
  }

  #menu > ul > li > ul a,
  #menu > ul > li > ul span {
    font-size: 0.8em;
  }

  #menu > ul > li > ul > li {
    margin: 0.125em 0 0 0;
    padding: 0.125em 0 0 0;
  }

  #menu > ul > li:first-of-type {
    border-top: 0;
    margin-top: 0;
    padding-top: 0;
  }
`;
