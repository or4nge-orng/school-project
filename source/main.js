const { app, BrowserWindow, ipcMain }= require('electron')
const PythonShell = require('python-shell')
const spawn = require('child_process').spawn;
const path = require('path')

app.disableHardwareAcceleration()

let options = {
    mode: "json",
    pythonPath: "python",
    pythonOptions: ['-u'],
}
const pythonProcess = spawn('python3', ["script.py"])
let pyshell = new PythonShell('script.py', options)

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
    
    ipcMain.on('send-to-python', (event, type, out_type, out_val) => {
        const webContents = event.sender
        const win = BrowserWindow.fromWebContents(webContents)
        console.log(`type: ${type}\n out_type: ${out_type}\n out_val: ${out_val}`)
        pyshell.send([type, out_type, out_val])
        pythonProcess.stdin.on('')
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
    pyshell.end()
})




