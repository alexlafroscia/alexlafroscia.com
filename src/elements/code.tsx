import styled from '@emotion/styled';

const Code = styled.code`
  /* Highlighted code snippets */
  pre > &[class*='language-'] {
    color: #d6deeb;
    text-align: left;
    white-space: pre;
    word-spacing: normal;
    word-break: normal;
    word-wrap: normal;

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
    font-weight: bold;
  }
`;

export default Code;
