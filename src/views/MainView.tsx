import MappableLogo from '@/assets/mappable-logo.svg?react';
import BtnsBlock from '@/components/BtnsBlock';
import MainFooter from '@/components/MainFooter';
import React, { useContext } from 'react';
import { ComponentProps, ViewKey } from '@/hooks/useView';
import { StateContext } from '@/context/configContext';

// export default forwardRef<HTMLDivElement, ComponentProps>( function MainView({ onChangeView }: ComponentProps, ref ){
export default function MainView({ src }: Omit<ComponentProps, 'onChangeView'> ){
    
    const { BtnsComponents } = useContext( StateContext );

    return (
        <div className="w-full h-full flex flex-col">
            <div className="relative w-full h-full bg-[#ECECEC] rounded-b-3xl overflow-hidden">
                
                <video src={`mappable://${src}`} preload="true" autoPlay={true} loop
                className="absolute w-full h-full outline-none object-scale-down top-1/2 -translate-y-1/2 right-0 translate-x-1/3"
                >
                    <source type="video/mp4"/>
                    Видео недоступно
                </video>

                <div className="absolute inset-0 flex flex-col pl-32 pt-44 gap-14 ">
                    <MappableLogo className="w-[306px] h-[48px]"/>
                    <p className="text-[88px] leading-[88px]">Locally relevant, <br/> highly customizable</p>
                    
                    <BtnsBlock title="Our solutions">
                        {BtnsComponents( ViewKey.VIDEO )}
                    </BtnsBlock>
                    <BtnsBlock title="Our products" >
                        {BtnsComponents( ViewKey.SITE )}
                    </BtnsBlock>
                </div>

            </div>
            <MainFooter/>
        </div>
    )
};