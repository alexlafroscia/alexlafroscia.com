import styled from "@emotion/styled";

import { background } from "../theme";
import { blue } from "../theme/palette";

const Pre = styled.pre`
  background: ${background};
  border-radius: 3px;
  margin: 0.5em 0;
  overflow: auto;
  padding: 1em;

  html[theme-mode="dark"] & {
    border: 2px solid ${blue};
  }
`;

export default Pre;
