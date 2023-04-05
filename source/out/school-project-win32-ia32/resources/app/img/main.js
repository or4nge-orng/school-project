const { app, BrowserWindow, ipcMain }= require('electron')
const { PythonShell } = require('python-shell')
const path = require('path')

app.disableHardwareAcceleration()

app.commandLine.appendSwitch("enable-logging");
app.commandLine.appendSwitch("log-file=logs.txt");


let pyshell = new PythonShell('script.py')

async function createWindow () {
    let win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    })
    win.loadFile('index.html')

    win.on('ready-to-show', async () => {
        win.show()
        win.maximize()
    })

    win.removeMenu()

    ipcMain.on('send-to-python', (event, type) => {
        console.log(type)
        
        
    })
}

app.whenReady().then(() => {
    createWindow()

    app.on('activate', function () {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
    pyshell.end(function (err) {
        if (err){
          throw err
        };
        console.log('finished')
      })
})




