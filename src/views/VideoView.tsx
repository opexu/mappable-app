import BackBtn from "@/components/BackBtn";
import { ComponentProps } from "@/hooks/useView";
import React, { forwardRef, useEffect, useRef } from "react";

export default function VideoView({ src, onChangeView }: ComponentProps ){
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        const handleEnded = () => {
            onChangeView();
        };
        const video = videoRef.current;

        if( video ) video.addEventListener('ended', handleEnded );
        return () => {
            if( video ) video.removeEventListener('ended', handleEnded );
        }
    }, [])
    
    
    return (
        <div className="relative w-full h-full">
            <video ref={videoRef} src={`mappable://${src}`} className="w-full h-full" preload="true" autoPlay>
                <source type="video/mp4"/>
                Видео недоступно
            </video>
            <BackBtn 
            className="absolute left-16 bottom-20"
            onClick={onChangeView}/>
        </div>
    )
};