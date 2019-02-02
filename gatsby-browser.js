import React from "react";
import Main from "./src/layouts/main";

import "./src/theme/prism-theme-night-owl.css";

export const wrapPageElement = ({ element }) => <Main>{element}</Main>;
