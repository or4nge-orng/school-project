const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
    sendToPython: (type) => ipcRenderer.sendSync('send-to-python', type)
})