import type { ConfigEnv, UserConfig } from 'vite';
import { defineConfig } from 'vite';
import { pluginExposeRenderer } from './vite.base.config';
import react from '@vitejs/plugin-react';
import svgr from "vite-plugin-svgr";
import { resolve } from 'path';

// https://vitejs.dev/config
export default defineConfig( ( env ) => {
    const forgeEnv = env as ConfigEnv<'renderer'>;
    const { root, mode, forgeConfigSelf } = forgeEnv;
    const name = forgeConfigSelf.name ?? '';

    return {
        root,
        mode,
        base: './',
        build: {
            outDir: `.vite/renderer/${name}`,
        },
        resolve: {
            alias: {
                '@': resolve( __dirname, './src' )
            },
            preserveSymlinks: true,
        },
        plugins: [ 
            pluginExposeRenderer( name ), 
            react(),
            svgr() 
        ],
        clearScreen: false,
    } as UserConfig;
} );
