import MainView from "@/views/MainView";
import MappableSiteView from "@/views/MappableSiteView";
import VideoView from "@/views/VideoView";
import YangoSiteView from "@/views/YangoSiteView";

export type ViewKey = keyof typeof VIEWS;

export interface ComponentProps {
    onChangeView: ( view: ViewKey ) => void;
}

export const VIEWS = {
    'main': MainView,
    'video': VideoView,
    'yango': YangoSiteView,
    'mappable': MappableSiteView,
}

export type ViewComponent = ReturnType<typeof getViewComponent>
export function getViewComponent( view: ViewKey ) {
    return VIEWS[ view ];
}


export enum IFRAME {
    YANGO = 'yango',
    GOOGLE = 'google',
}