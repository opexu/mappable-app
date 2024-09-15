import { useState } from 'react'
import { getViewComponent, View } from '@/types/view';
import React from 'react';

export default function App() {
    const [ activeComponent, setActiveComponent ] = useState<View>( 'main' );

    function handleBackClick( view: View ){
        setActiveComponent( view )
    }

    const renderComponent = () => {
        const Component = getViewComponent( activeComponent );
        return <Component onChangeView={ handleBackClick }/>;
    };

    return (
        <div className='w-full h-full bg-[rgba(236,236,236,1)]'>
            { renderComponent() }
        </div>
    )
}