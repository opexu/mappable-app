import { ComponentProps, IFRAME } from '@/types/view';
import React, { forwardRef, useRef } from 'react';

// export default forwardRef<HTMLDivElement, ComponentProps>(({ onChangeView }, ref ) => {
export default function YangoSiteView({ onChangeView }: ComponentProps ){
    return (
        <div className='w-full h-full flex flex-row'>
            <div className='w-auto h-full p-4  bg-black flex flex-row items-end'>
                <button className='w-fit h-fit px-4 py-2 border rounded-md border-white text-white'
                onClick={()=>{ onChangeView( 'main' ) }}
                >
                    Back
                </button>
            </div>
            <div className='w-full h-full p-4 rounded-md'>
                <div className='relative w-full h-full rounded-lg overflow-hidden'>
                    <webview className='absolute top-0 left-0 w-full h-full' src='https://maps.yango.com/11499/dubai/?ll=55.274274%2C25.197169&z=12'></webview>
                </div>
            </div>
        </div>
    )
};