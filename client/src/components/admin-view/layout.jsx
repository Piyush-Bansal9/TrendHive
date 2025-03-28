import React from 'react'
import { Outlet } from 'react-router-dom'

function Adminlayout() {
    return <div className='flex min-h-screen w-full'>
        {/* Sidebar Component */}
        <div className='flex flex-col flex-1 bg-amber-100'>
            {/* Header Component */}
            <main className='flex flex-1'><Outlet/></main>
        </div>
    </div>
}

export default Adminlayout
