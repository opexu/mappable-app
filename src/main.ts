import { app, BrowserWindow } from 'electron';
import path from 'path';
import { ElectronBlocker, fullLists, Request } from '@cliqz/adblocker-electron';
import { readFileSync, writeFileSync } from 'fs';

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

const createWindow = async () => {
    // Create the browser window.
    const mainWindow = new BrowserWindow( {
        autoHideMenuBar: true,
        width: 800,
        height: 600,
        webPreferences: {
            devTools: false,
            webviewTag: true,
            preload: path.join( __dirname, 'preload.js' ),
        },
    } );

    // and load the index.html of the app.
    if ( MAIN_WINDOW_VITE_DEV_SERVER_URL ) {
        mainWindow.loadURL( MAIN_WINDOW_VITE_DEV_SERVER_URL );
    } else {
        mainWindow.loadFile( path.join( __dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html` ) );
    }

    // Open the DevTools.
    // mainWindow.webContents.openDevTools();
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
app.on( 'ready', createWindow );

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
