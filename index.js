const electron = require('electron');
const app = electron.app;  // Module to control application life.
const BrowserWindow = electron.BrowserWindow;  // Module to create native browser window.

var mainWindow = null;
app.on('window-all-closed', () => app.quit());
app.on('ready', () => {
  mainWindow = new BrowserWindow({width: 800, height: 600});
  mainWindow.loadURL('file://' + __dirname + '/app/index.html');
  mainWindow.webContents.openDevTools();
  mainWindow.on('closed', () => mainWindow = null);
});
