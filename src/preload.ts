// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
import { contextBridge, ipcRenderer } from 'electron';
import { IConfig } from './scripts/config';

// Пример: передача данных через `window` объект
contextBridge.exposeInMainWorld( 'electronAPI', {
    sendConfig: () => ipcRenderer.send( 'getConfig' ),
    onReceiveConfig: ( cb: ( config: IConfig ) => void ) => ipcRenderer.on( 'sendConfig', ( e, config: IConfig ) => cb( config ) )
} );