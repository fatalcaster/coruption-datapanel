"use strict";

import { app, BrowserWindow, ipcMain, ipcRenderer } from "electron";
import * as path from "path";
import { format as formatUrl } from "url";
import installExtension, {
    REACT_DEVELOPER_TOOLS,
} from "electron-devtools-installer";
import { createConnection } from "typeorm";

import typeormConfig from "./../typeorm.config";
import {
    filterKU,
    getKUDisplayData,
    getKUEditData,
    saveKU,
    searchKU,
} from "./Functionality/KU";

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

    app.allowRendererProcessReuse = true;
    // create main BrowserWindow when electron is ready
    app.on("ready", () => {
        mainWindow = createMainWindow();
    });

    createConnection(typeormConfig).then((_connection) => {
        ipcMain.on("save-ku", async (event, data) => {
            saveKU(data, mainWindow!);
        });

        ipcMain.on("ku-display-request", async (event, arg) => {
            console.log("ARG\n", arg);
            const data = await getKUDisplayData(0, 5);
            if (arg.return) event.returnValue = data;
            else
                mainWindow!.webContents.send(
                    "update-ku-display",
                    await getKUDisplayData(0, 10)
                );
        });

        ipcMain.on("ku-search-request", async (event, data) => {
            searchKU(data.values, mainWindow!);
        });

        ipcMain.on("ku-filter-request", async (event, data) => {
            filterKU(data.values, mainWindow!);
        });
        ipcMain.on("get-ku-edit", async (event, arg) => {
            console.log("ARG\n", arg);
            const data = await getKUEditData(arg);
            event.returnValue = data;
            // else
            //     mainWindow!.webContents.send(
            //         "update-ku-display",
            //         await getKUDisplayData(0, 10)
            //     );
        });
    });
};

main().catch((err) => {
    console.error(err);
});
