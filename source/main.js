const { app, BrowserWindow, ipcMain }= require('electron')
const path = require('path')
const {PythonShell} = require('python-shell')

app.disableHardwareAcceleration()

let pyshell = new PythonShell("script.py")

async function createWindow () {
    let mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            devTools: true,
        }
    })

    mainWindow.loadFile('index.html')

    mainWindow.on('ready-to-show', async () => {
        mainWindow.show()
    })

    mainWindow.removeMenu() 
}

app.whenReady().then(() => {
    createWindow()

    app.on('activate', function () {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
    pyshell.end()
})

ipcMain.on('send-to-python', (event, type, out_type, out_val) => {
    const webContents = event.sender
    const win = BrowserWindow.fromWebContents(webContents)
    console.log(typeof type, type)
    let options = {
        mode: 'text',
        pythonPath: 'python',
        pythonOptions: ['-u'], // get print results in real-time
        scriptPath: './',
        args: [type, out_type, out_val]
      };
      
      PythonShell.run('script.py', options).then(results=>{
        // results is an array consisting of messages collected during execution
        console.log(results);
      });
})
