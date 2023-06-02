import React from 'react'
import Header from './header'

const Layout = ({ children, data, category }) => {
    return (
        <div>
            <Header data={data} category={category} />
            {children}
        </div>
    )
}

export default Layout