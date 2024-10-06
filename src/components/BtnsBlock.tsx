import React from "react";

export interface BtnsBlockProps {
    title: string;
    children: React.ReactNode;
}

export default function BtnsBlock({ title, children }: BtnsBlockProps ){

    return (
        <div className="w-fit h-fit flex flex-col gap-5">
            <p className="text-[20px]">{ title }</p>
            <div className="w-fit h-fit flex flex-row gap-5">
                {children}
            </div>
            
        </div>
    );
}