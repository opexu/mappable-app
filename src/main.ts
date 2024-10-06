import { app, BrowserWindow, protocol, net } from 'electron';
import path from 'path';
import { ElectronBlocker, fullLists, Request } from '@cliqz/adblocker-electron';
import { readFileSync, writeFileSync } from 'fs';
import { ipcMain } from 'electron';
import { fillConfig, IConfig, readConfig } from './scripts/config';

const devMode = isDevMode( process.argv.slice( 2 ) );

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if ( require( 'electron-squirrel-startup' ) ) {
    app.quit();
}

function getUrlToLoad(): string {
    let url = 'https://google.com';
    if ( process.argv[ process.argv.length - 1 ].endsWith( '.js' ) === false ) {
        url = process.argv[ process.argv.length - 1 ];
    }

    return url;
}

protocol.registerSchemesAsPrivileged([
    {
        scheme: 'mappable',
        privileges: {
            secure: true,
            supportFetchAPI: false,
            bypassCSP: true,
            stream: true,
            standard: true,
        } 
    }
]);

const createWindow = async () => {
    // Create the browser window.

    const mainWindow = new BrowserWindow( {
        autoHideMenuBar: false,
        width: 1024,
        height: 768,
        webPreferences: {
            devTools: devMode,
            webviewTag: true,
            preload: path.join( __dirname, 'preload.js' ),
            nodeIntegration: true,
            contextIsolation: true,
        },
    } );

    const openDevTools = () => {
        // if ( devMode ) mainWindow.webContents.openDevTools();
        mainWindow.webContents.openDevTools();
    }
    // and load the index.html of the app.
    if ( MAIN_WINDOW_VITE_DEV_SERVER_URL ) {
        mainWindow.loadURL( MAIN_WINDOW_VITE_DEV_SERVER_URL ).then( () => openDevTools() );
    } else {
        mainWindow.loadFile( path.join( __dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html` ) ).then( () => openDevTools() );
    }

    // Open the DevTools.
    // if( devMode ){
    //     mainWindow.webContents.openDevTools();
    // }
    // mainWindow.removeMenu();

    const blocker = await ElectronBlocker.fromLists(
        fetch,
        fullLists,
        {
            enableCompression: true,
        },
        {
            path: 'engine.bin',
            read: async ( ...args ) => readFileSync( ...args ),
            write: async ( ...args ) => writeFileSync( ...args ),
        },
    );

    blocker.enableBlockingInSession( mainWindow.webContents.session );

    blocker.on( 'request-blocked', ( request: Request ) => {
        console.log( 'blocked', request.tabId, request.url );
    } );

    blocker.on( 'request-redirected', ( request: Request ) => {
        console.log( 'redirected', request.tabId, request.url );
    } );

    blocker.on( 'request-whitelisted', ( request: Request ) => {
        console.log( 'whitelisted', request.tabId, request.url );
    } );

    blocker.on( 'csp-injected', ( request: Request, csps: string ) => {
        console.log( 'csp', request.url, csps );
    } );

    blocker.on( 'script-injected', ( script: string, url: string ) => {
        console.log( 'script', script.length, url );
    } );

    blocker.on( 'style-injected', ( style: string, url: string ) => {
        console.log( 'style', style.length, url );
    } );

    blocker.on( 'filter-matched', console.log.bind( console, 'filter-matched' ) );

    // mainWindow.loadURL( getUrlToLoad() );
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
const config: IConfig = {
    idle_timeout_seconds: 10,
    main_video: '',
    video_btns: [],
    site_btns: [],
};
const CONFIG_FOLDER_PATH = devMode 
    ? path.join( __dirname, '..', '..', 'src', 'CONFIG' )
    : path.join( process.resourcesPath, 'CONFIG' )
console.log('CONFIG_FOLDER_PATH: ', CONFIG_FOLDER_PATH);

app.on( 'ready', async () => {
    const target = await readConfig( path.join( CONFIG_FOLDER_PATH, 'config.json' ) );
    fillConfig( config, target );
    protocolHandlers();
    createWindow();
} );
ipcMain.on( 'getConfig', ( event ) => {
    event.sender.send('sendConfig', config);
    return config; // Возвращаем конфиг при запросе из рендерера
} );

function protocolHandlers(){

    protocol.handle('mappable', ( req ) => {
        const videoName = req.url.slice( 'mappable://'.length ).slice( 0, -1 );
        console.log('videoName: ', videoName)
        const videoPath = path.join( CONFIG_FOLDER_PATH, videoName );
        return net.fetch( 'file://' + videoPath );
    })
}
// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on( 'window-all-closed', () => {
    if ( process.platform !== 'darwin' ) {
        app.quit();
    }
} );

app.on( 'activate', () => {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if ( BrowserWindow.getAllWindows().length === 0 ) {
        createWindow();
    }
} );

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
function isDevMode( args: string[] ): boolean {
    console.log( 'args: ', args )
    const mode = args[ 0 ];
    if ( mode !== '--mode' ) return false;
    const value = args[ 1 ];
    if ( value === 'dev' ) return true;
    else return false;
}