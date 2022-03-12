import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";
// _App.js is refactored version of App.js
import App from "./_App";

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
