import React from 'react'
import Header from './header'

const Layout = ({ children, data }) => {
    return (
        <div>
            <Header data={data} />
            {children}
        </div>
    )
}

export default Layout