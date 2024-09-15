import { ComponentProps } from "@/types/view";
import React, { forwardRef, useRef } from "react";

// export default forwardRef<HTMLDivElement, ComponentProps>(({ onChangeView }, ref ) => {
export default function VideoView({ onChangeView }: ComponentProps ){
    return (
        <>
            <div>VideoView</div>
        </>
    )
};