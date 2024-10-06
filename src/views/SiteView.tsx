import React, { forwardRef, useRef } from 'react';
import BackArrow from '@/assets/arrow entrance.svg?react';
import { ComponentProps } from '@/hooks/useView';

// export default forwardRef( function MappableSiteView({ onChangeView }: ComponentProps, ref ){
export default function SiteView({ src, onChangeView }: ComponentProps ){
    return (
        <div className='w-full h-full flex flex-row'>
            <button className='w-24 h-full bg-[#EEFD7D] flex flex-row items-center justify-center'
            onClick={onChangeView}
            >
                <div className="w-fit h-fit flex flex-col items-center justify-center">
                    <p>Back</p>
                    <BackArrow/>
                </div>
            </button>
            <div className='w-full h-full p-4 rounded-md'>
                <div className='relative w-full h-full rounded-lg overflow-hidden'>
                    <webview className='absolute top-0 left-0 w-full h-full' src={src}></webview>
                </div>
            </div>
        </div>
    )
};