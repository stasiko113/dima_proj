const { app, BrowserWindow, ipcMain, dialog, shell } = require('electron')

const path = require('path')
const isDev = require('electron-is-dev')
const { writeFile, copyFile } = require('fs').promises

require('@electron/remote/main').initialize()

function createWindow() {
  // Create the browser window.
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      executablePath: '/Users/enigma/chrome/mac_arm-124.0.6367.201/chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing',
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true
    }
  })

  win.loadURL(
    isDev
      ? 'http://localhost:3000'
      : `file://${path.join(__dirname, '../build/index.html')}`
  )



  ipcMain.on('save-csv', (event, rows) => {
    const csvContent = rows.map(row => Object.values(row).join(",")).join("\n");
    const filePath = path.join(app.getAppPath(), 'data.csv');

    writeFile(filePath, csvContent, 'utf-8', (err) => {
      if (err) {
        console.error('Ошибка сохранения файла:', err);
        event.reply('save-csv-reply', { success: false, error: err });
        return;
      }
      console.log('Файл сохранен успешно:', filePath);
      event.reply('save-csv-reply', { success: true });
    });
  });

  ipcMain.on('request-user-data-path', (event, pdfPath) => {
    const userDataPath = app.getPath('userData');
    event.reply('user-data-path', userDataPath, pdfPath);
  });

  ipcMain.on('open-pdf-file', (event, pdfFileName) => {
    const pdfFilePath = `${path.join(__dirname, '../', pdfFileName)}`;
    console.log(pdfFilePath)

    shell.openPath(pdfFilePath);
  });
}

app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})
