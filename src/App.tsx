import React, { useContext } from 'react';
import { useRef, useState } from 'react'
import { SwitchTransition, CSSTransition } from 'react-transition-group';
import { IConfig } from './scripts/config';
import { useView } from './hooks/useView';
import StateProvider from './context/stateProvider';
import { StateContext } from './context/configContext';

export default function App() {

    const { state, DynamicComponent } = useContext( StateContext );
    const nodeRef = useRef(null);
    
    return (
        <div className='w-full h-full'>
            <SwitchTransition mode='out-in'>
                <CSSTransition
                key={state}
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
                        <DynamicComponent/>
                    </div>
                </CSSTransition>
            </SwitchTransition>
        </div>
    )
}