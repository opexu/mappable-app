import * as path from 'path';
import * as fsp from 'fs/promises';

export interface IConfig {
    idle_timeout_seconds: number,
    main_video: string,
    video_btns: IConfigBtn[],
    site_btns: IConfigBtn[]
}

export interface IConfigBtn {
    title: string,
    src: string,
}

export async function readConfig( path: string ): Promise<Partial<IConfig>> {
    try{
        const dataStr = await fsp.readFile( path, { encoding: 'utf8' } );
        return JSON.parse( dataStr );
    }catch(e){
        console.error('Ошибка чтения файла конфига', e);
        return {
            idle_timeout_seconds: 10,
            main_video: '',
            video_btns: [],
            site_btns: [],
        }
    }
}

export function fillConfig( source: IConfig, target: Partial<IConfig> ){
    if( target.idle_timeout_seconds ) source.idle_timeout_seconds = target.idle_timeout_seconds;
    if( target.main_video ) source.main_video = target.main_video;
    if( target.video_btns && Array.isArray( target.video_btns ) && target.video_btns.length ){
        target.video_btns.forEach( targetBtn => {
            const btn = getBtn( targetBtn );
            if( !btn ) return;
            source.video_btns.push( btn );
        })
    }
    if( target.site_btns && Array.isArray( target.site_btns ) && target.site_btns.length ){
        target.site_btns.forEach( targetBtn => {
            const btn = getBtn( targetBtn );
            if( !btn ) return;
            source.site_btns.push( btn );
        })
    }
}

function getBtn( target: IConfigBtn ): IConfigBtn | null {
    if( !target.title || !target.src ) return null;
    return {
        title: target.title,
        src: target.src,
    }
}
// export function fillConfigFile( config: IConfig, data: string ): IConfig {

//     const lines = data.split( '\n' );

//     lines.forEach( ( line ) => {
//         let [ key, value ] = line.split( '=' );
//         key = key.trim();
//         if ( !isConfigKey( config, key ) ) return;
//         if ( key && value ) {
//             config[ key ] = value.trim();
//         }
//     } );

//     return config;
// }

// export function isConfigKey( config: IConfig, key: string ): key is ConfigKey {
//     return key in config;
// }