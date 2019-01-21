import { app, BrowserWindow, Tray, Menu } from "electron";
const path = require("path");
import installExtension, {
  REACT_DEVELOPER_TOOLS
} from "electron-devtools-installer";
import { enableLiveReload } from "electron-compile";

const iconPath = path.join(__dirname, "bull-side-view-black-animal-shape.png");

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.

const getPercentage = function(endTime, startTime) {
  return (
    100 *
    (1 -
      (endTime.getTime() - new Date().getTime()) /
        (endTime.getTime() - startTime.getTime()))
  ).toFixed(0);
};

const getTimeLeftPercent = function(period, startDate = null, endDate = null) {
  switch (period) {
    case "day":
      let startOfDay = new Date();
      startOfDay.setHours(0);
      startOfDay.setMinutes(0);
      startOfDay.setSeconds(0);
      startOfDay.setMilliseconds(0);
      let endOfDay = new Date(startOfDay);
      endOfDay.setDate(startOfDay.getDate() + 1);
      return getPercentage(endOfDay, startOfDay);

    case "month":
      let startOfMonth = new Date();
      startOfMonth.setDate(0);
      startOfMonth.setHours(0);
      startOfMonth.setMinutes(0);
      startOfMonth.setSeconds(0);
      startOfMonth.setMilliseconds(0);
      let endOfMonth = new Date(startOfMonth);
      endOfMonth.setMonth(endOfMonth.getMonth() + 1);
      return getPercentage(endOfMonth, startOfMonth);

    case "year":
      let startOfYear = new Date();
      startOfYear.setMonth(0);
      startOfYear.setDate(0);
      startOfYear.setHours(0);
      startOfYear.setMinutes(0);
      startOfYear.setSeconds(0);
      startOfYear.setMilliseconds(0);
      let endOfYear = new Date(startOfYear);
      endOfYear.setYear(endOfYear.getFullYear() + 1);
      return getPercentage(endOfYear, startOfYear);

    case "deadline":
      // code block
      break;
  }
};

let mainWindow;

const isDevMode = process.execPath.match(/[\\/]electron/);

if (isDevMode) enableLiveReload({ strategy: "react-hmr" });

const createWindow = async () => {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    show: false
  });
  let appIcon = new Tray(iconPath);
  var contextMenu = Menu.buildFromTemplate([
    {
      label: `Day ${getTimeLeftPercent("day")} %`,
      type: "radio"
    },
    {
      label: `Month ${getTimeLeftPercent("month")} %`,
      type: "radio"
    },
    {
      label: `Year ${getTimeLeftPercent("year")} %`,
      type: "radio"
    },
    {
      label: "Deadline",
      type: "radio"
    },
    {
      type: "separator"
    },
    {
      label: "Preferences",
      type: "normal"
    }
  ]);
  appIcon.setContextMenu(contextMenu);

  // and load the index.html of the app.
  mainWindow.loadURL(`file://${__dirname}/index.html`);

  // Open the DevTools.
  if (isDevMode) {
    await installExtension(REACT_DEVELOPER_TOOLS);
    mainWindow.webContents.openDevTools();
  }

  // Emitted when the window is closed.
  mainWindow.on("closed", () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
};

const createMenuBarItem = async () => {
  const { app, Tray, Menu, BrowserWindow } = require("electron");
  const path = require("path");

  //const iconPath = path.join(__dirname, "");
  //let appIcon = null;
  let win = null;

  win = new BrowserWindow({ show: false });
  appIcon = new Tray("progressbar");
  var contextMenu = Menu.buildFromTemplate([
    {
      label: "Day",
      type: "radio"
    },
    {
      label: "Month",
      type: "radio"
    },
    {
      label: "Year",
      type: "radio"
    },
    {
      label: "Deadline",
      type: "radio"
    },
    {
      type: "separator"
    }
  ]);
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", createWindow);

// Quit when all windows are closed.
app.on("window-all-closed", () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
