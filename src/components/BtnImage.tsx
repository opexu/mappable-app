import React from "react";

export default function BtnImage({ title, src, onClick }: { title: string, src: string, onClick: () => void }){

    return (
        <button className="min-w-[280px] w-fit h-[68px] flex flex-row items-center justify-center border rounded-md border-[#181B22] bg-[#181B22] text-white hover:text-black hover:bg-[rgba(238,253,125,1)] active:bg-[rgba(238,253,125,1)] active:text-black text-center"
        onClick={onClick}
        >
            <div className="w-fit h-fit flex flex-row items-center justify-center">
                <img className="w-[46px] h-[46px] mt-2" src={src}/>
                <p className="text-center text-[18px]">{title}</p>
            </div>
        </button>
    );
}