const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('calculatorAPI', {
    sendToPython: (type, out_type, out_val) => ipcRenderer.send('send-to-python', type, out_type, out_val),
    sendResult: (result) => ipcRenderer.on('send-result', result)
})