import { css } from '@emotion/core';

export const usedIcons = css`
  .fa-caret-down:before {
    content: '\f0d7';
  }
  .fa-caret-left:before {
    content: '\f0d9';
  }
  .fa-github:before {
    content: '\f09b';
  }
  .fa-twitter:before {
    content: '\f099';
  }
  .fa-medium:before {
    content: '\f23a';
  }
  .fa-rss:before {
    content: '\f09e';
  }
  .fa-lightbulb-o:before {
    content: '\f0eb';
  }
`;

export const core = css`
  @font-face {
    font-family: 'FontAwesome';
    src: url('/assets/fonts/fontawesome-webfont.eot?v=4.7.0');
    src: url('/assets/fonts/fontawesome-webfont.eot?#iefix&v=4.7.0') format('embedded-opentype'),
      url('/assets/fonts/fontawesome-webfont.woff2?v=4.7.0') format('woff2'),
      url('/assets/fonts/fontawesome-webfont.woff?v=4.7.0') format('woff'),
      url('/assets/fonts/fontawesome-webfont.ttf?v=4.7.0') format('truetype'),
      url('/assets/fonts/fontawesome-webfont.svg?v=4.7.0#fontawesomeregular') format('svg');
    font-weight: normal;
    font-style: normal;
  }
  .fa {
    display: inline-block;
    font: normal normal normal 14px/1 FontAwesome;
    font-size: inherit;
    text-rendering: auto;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  .fa-lg {
    font-size: 1.33333333em;
    line-height: 0.75em;
    vertical-align: -15%;
  }
  .fa-2x {
    font-size: 2em;
  }
  .fa-3x {
    font-size: 3em;
  }
  .fa-4x {
    font-size: 4em;
  }
  .fa-5x {
    font-size: 5em;
  }
  .fa-fw {
    width: 1.28571429em;
    text-align: center;
  }
  .fa-ul {
    padding-left: 0;
    margin-left: 2.14285714em;
    list-style-type: none;
  }
  .fa-ul > li {
    position: relative;
  }
  .fa-li {
    position: absolute;
    left: -2.14285714em;
    width: 2.14285714em;
    top: 0.14285714em;
    text-align: center;
  }
  .fa-li.fa-lg {
    left: -1.85714286em;
  }
  .fa-border {
    padding: 0.2em 0.25em 0.15em;
    border: solid 0.08em #eee;
    border-radius: 0.1em;
  }
  .fa-pull-left {
    float: left;
  }
  .fa-pull-right {
    float: right;
  }
  .fa.fa-pull-left {
    margin-right: 0.3em;
  }
  .fa.fa-pull-right {
    margin-left: 0.3em;
  }
  .pull-right {
    float: right;
  }
  .pull-left {
    float: left;
  }
  .fa.pull-left {
    margin-right: 0.3em;
  }
  .fa.pull-right {
    margin-left: 0.3em;
  }
  .fa-stack {
    position: relative;
    display: inline-block;
    width: 2em;
    height: 2em;
    line-height: 2em;
    vertical-align: middle;
  }
  .fa-stack-1x,
  .fa-stack-2x {
    position: absolute;
    left: 0;
    width: 100%;
    text-align: center;
  }
  .fa-stack-1x {
    line-height: inherit;
  }
  .fa-stack-2x {
    font-size: 2em;
  }
  .fa-inverse {
    color: #fff;
  }
  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    border: 0;
  }
  .sr-only-focusable:active,
  .sr-only-focusable:focus {
    position: static;
    width: auto;
    height: auto;
    margin: 0;
    overflow: visible;
    clip: auto;
  }
`;
