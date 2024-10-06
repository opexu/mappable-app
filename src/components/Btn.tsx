import React from "react";

export default function Btn({ title, onClick }: { title: string, onClick: () => void }){

    return (
        <button className="min-w-[280px] w-fit h-[68px] border rounded-md border-[#181B22] bg-[#181B22] text-white hover:text-black hover:bg-[rgba(238,253,125,1)] active:bg-[rgba(238,253,125,1)] active:text-black text-center"
        onClick={onClick}
        >
            <p className="text-center text-[18px]">{title}</p>
        </button>
    );
}