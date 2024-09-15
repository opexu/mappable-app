import MainView from "@/views/MainView";
import MappableSiteView from "@/views/MappableSiteView";
import VideoView from "@/views/VideoView";
import YangoSiteView from "@/views/YangoSiteView";

export type View = keyof typeof VIEWS;

export interface ComponentProps {
    onChangeView: ( view: View ) => void;
}

export const VIEWS = {
    'main': MainView,
    'video': VideoView,
    'yango': YangoSiteView,
    'mappable': MappableSiteView,
}

export function getViewComponent( view: View ){
    return VIEWS[ view ];
}


export enum IFRAME {
    YANGO = 'yango',
    GOOGLE = 'google',
}