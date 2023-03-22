const { app, BrowserWindow, ipcMain }= require('electron')
const path = require('path')

app.disableHardwareAcceleration()

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
        console.log(type, out_type, out_val)
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
})




