import { useRef, useState } from 'react'
import { getViewComponent, ViewKey } from '@/types/view';
import React from 'react';
import { SwitchTransition, CSSTransition } from 'react-transition-group';

export default function App() {
    const [ componentKey, setComponentKey ] = useState<ViewKey>( 'main' );
    const nodeRef = useRef(null);

    function handleComponentChange( view: ViewKey ){
        setComponentKey( view );
    }

    const DymanicComponent = getViewComponent( componentKey );

    return (
        <div className='w-full h-full bg-[rgba(236,236,236,1)]'>
            <SwitchTransition mode='out-in'>
                <CSSTransition
                key={componentKey}
                nodeRef={nodeRef}
                timeout={500}
                classNames={{
                    enter: 'fade-enter',
                    enterActive: 'fade-enter-active',
                    exit: 'fade-exit',
                    exitActive: 'fade-exit-active'
                }}
                unmountOnExit
                >
                    <div ref={nodeRef} className='w-full h-full'>
                        <DymanicComponent onChangeView={ handleComponentChange }/>
                    </div>
                </CSSTransition>
            </SwitchTransition>
        </div>
    )
}