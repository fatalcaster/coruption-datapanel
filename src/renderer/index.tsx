import { Titlebar, Color } from "custom-electron-titlebar";
import React from "react";
import { render } from "react-dom";
import { createConnection } from "typeorm";
import typeormConfig from "../typeorm.config";
import { App } from "./App";
import "reflect-metadata";

new Titlebar({
    backgroundColor: Color.fromHex("#1E1E1E"),
    menu: null,
});

render(<App />, document.getElementById("app"));
