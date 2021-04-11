import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import { StateProvider } from "./contextAPI/StateProvider";
import reducer, { initialState } from "./contextAPI/reducer";
import "./scss/app.scss"

ReactDOM.render(
  <StateProvider initialState={initialState} reducer={reducer}>
    <App />
  </StateProvider>,
  document.querySelector("#root")
);
