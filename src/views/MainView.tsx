import MappableLogo from '@/assets/mappable-logo.svg?react';
import { ComponentProps, ViewComponent } from '@/types/view';
import React, { forwardRef, useRef } from 'react';

// export default forwardRef<HTMLDivElement, ComponentProps>( function MainView({ onChangeView }: ComponentProps, ref ){
export default function MainView({ onChangeView }: ComponentProps ){
        return (
        <div>
            <MappableLogo/>
            <div className='w-fit h-fit flex flex-row gap-2'>
                <button className='w-fit h-fit p-4 border rounded-md border-black bg-black text-white active:bg-[rgba(238,253,125,1)] active:text-black'
                onClick={()=>{onChangeView('mappable')}}
                >
                    Mappable
                </button>
                <button className='w-fit h-fit p-4 border rounded-md border-black bg-black text-white active:bg-[rgba(238,253,125,1)] active:text-black'
                onClick={()=>{onChangeView('yango')}}
                >
                    Yango
                </button>
            </div>
            
        </div>
    )
};