import { IConfig } from "@/scripts/config";
import { useView } from "@/hooks/useView";
import React from 'react';
import { StateContext } from "./configContext";

export default function StateProvider({ config, children }: { config: IConfig, children: React.ReactNode }) {

    const view = useView( config );
    
    return (
        <StateContext.Provider value={view}>
            {children}
        </StateContext.Provider>
    );
};