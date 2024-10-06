import * as React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './index.css';
import { IConfig } from './scripts/config';
import StateProvider from './context/stateProvider';

function createReact( config: IConfig ){
    createRoot( document.getElementById( 'root' )! ).render(
        <React.StrictMode>
            <StateProvider config={config}>
                <App/>
            </StateProvider>
        </React.StrictMode>,
    );
}

window.electronAPI.onReceiveConfig( config => {
    createReact( config );
});
window.electronAPI.sendConfig();