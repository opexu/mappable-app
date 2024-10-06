import React from "react";

export default function BackBtn({ onClick, className }: { onClick: () => void, className?: string } ){
    return (
        <>
            <button className={`${className || ''} w-56 h-14 flex flex-row items-center justify-center border border-black rounded-md bg-[#FFFFFF99] hover:bg-[#EEFD7D99] active:bg-[#EEFD7D99]`}
            onClick={onClick}
            >
                <div className="w-fit h-fit flex flex-row gap-2 items-center justify-center">
                    <svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7.53535 0.636033C7.92587 1.02656 7.92587 1.65972 7.53535 2.05025L2.5856 6.99999L7.53535 11.9497C7.92587 12.3403 7.92587 12.9734 7.53535 13.364C7.14482 13.7545 6.51166 13.7545 6.12113 13.364L0.46428 7.7071C0.0737556 7.31658 0.0737556 6.68341 0.46428 6.29289L6.12113 0.636033C6.51166 0.245509 7.14482 0.245509 7.53535 0.636033Z" fill="#181B22"/>
                    </svg>
                    <p className="font-semibold">BACK</p>
                </div>
            </button>
        </>
    );
}