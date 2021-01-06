import { Titlebar, Color } from "custom-electron-titlebar";
import React from "react";
import { render } from "react-dom";
import { App } from "./App";

new Titlebar({
    backgroundColor: Color.fromHex("#1E1E1E"),
    menu: null,
});

render(<App />, document.getElementById("app"));
