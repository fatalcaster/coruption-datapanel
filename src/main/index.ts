"use strict";

import { app, BrowserWindow } from "electron";
import * as path from "path";
import { format as formatUrl } from "url";
import installExtension, {
    REACT_DEVELOPER_TOOLS,
} from "electron-devtools-installer";
import DB from "../DBInitizaliation";
import mikroConfig from "./../mikro-orm.config";

const isDevelopment = process.env.NODE_ENV !== "production";

// global reference to mainWindow (necessary to prevent window from being garbage collected)
export let mainWindow: BrowserWindow | null;

function createMainWindow() {
    const window = new BrowserWindow({
        webPreferences: { nodeIntegration: true },
        titleBarStyle: "hidden",
        frame: false,
    });

    app.whenReady().then(() => {
        installExtension(REACT_DEVELOPER_TOOLS).then((name: string) => {
            console.log("Installed", name);
            if (isDevelopment) {
                window.webContents.openDevTools();
            }
        });
    });

    if (isDevelopment) {
        window.loadURL(
            `http://localhost:${process.env.ELECTRON_WEBPACK_WDS_PORT}`
        );
    } else {
        window.loadURL(
            formatUrl({
                pathname: path.join(__dirname, "index.html"),
                protocol: "file",
                slashes: true,
            })
        );
    }

    window.on("closed", () => {
        mainWindow = null;
    });

    window.webContents.on("devtools-opened", () => {
        window.focus();
        setImmediate(() => {
            window.focus();
        });
    });

    return window;
}

const main = async () => {
    // quit application when all windows are closed
    app.on("window-all-closed", () => {
        // on macOS it is common for applications to stay open until the user explicitly quits
        if (process.platform !== "darwin") {
            app.quit();
        }
    });

    app.on("activate", () => {
        // on macOS it is common to re-create a window even after all windows have been closed
        if (mainWindow === null) {
            mainWindow = createMainWindow();
        }
    });

    // create main BrowserWindow when electron is ready
    app.on("ready", () => {
        mainWindow = createMainWindow();
    });

    await DB.initialize({ config: mikroConfig! });

    /*const t = DB.em.create(User, {
        name: "Vojin",
        surname: "Milovic",
        password: await argon2.hash("Hemijska125"),
        username: "mr_vojin",
    });
    DB.em.persistAndFlush(t);*/
};

main().catch((err) => {
    console.error(err);
});
