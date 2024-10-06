import Btn from "@/components/Btn";
import BtnImage from "@/components/BtnImage";
import { IConfig, IConfigBtn } from "@/scripts/config";
import MainView from "@/views/MainView";
import SiteView from "@/views/SiteView";
import VideoView from "@/views/VideoView";
import React, { useState } from "react";
import ArrowImage from "@/assets/maps_image.png";

export type IState = IConfigBtn['title'] | 'main';
export enum ViewKey { MAIN, VIDEO, SITE };
export type ComponentProps = { src: string, onChangeView: () => void };

export function useView( config: IConfig ){

    const [ state, setState ] = useState<IState>( 'main' );
    const style = config.style === "contain" ? "object-contain" : "object-cover";

    function getView( state: IState ): ViewKey {
        if( config.video_btns.findIndex( btn => btn.title === state ) !== -1 ) return ViewKey.VIDEO;
        else if ( config.site_btns.findIndex( btn => btn.title === state ) !== -1 ) return ViewKey.SITE;
        else return ViewKey.MAIN;
    }

    function getSrc( viewKey: ViewKey, state: IState ): string {
        if( viewKey === ViewKey.MAIN ) return config.main_video;
        else return config[ viewKey === ViewKey.VIDEO ? 'video_btns' : 'site_btns' ].find( btn => btn.title === state )?.src;
    }

    function DynamicComponent(){
        const viewKey = getView( state );
        const src = getSrc( viewKey, state );
        if( viewKey === ViewKey.MAIN ) return MainView({ src });
        if( viewKey === ViewKey.VIDEO ) return VideoView({ src, onChangeView: () => { setState( 'main' ) }});
        else return SiteView({ src, onChangeView: () => { setState( 'main' ) }});
    }

    function BtnsComponents( viewKey: ViewKey ){
        const btns = config[ viewKey === ViewKey.VIDEO ? 'video_btns' : 'site_btns' ];
        return (
            <>
                {btns.map( btn => (
                    btn.title !== 'MAPS'
                        ? <Btn key={btn.title} title={btn.title} onClick={() => { setState( btn.title ) }}/>
                        : <BtnImage src={ArrowImage} key={btn.title} title={btn.title} onClick={() => { setState( btn.title ) }}/>
                ))}
            </>
        )
    }

    return { state, style, DynamicComponent, BtnsComponents }
}