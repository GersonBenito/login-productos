import React from 'react'
import Footer from '../container/Footer'
import Header from '../container/Header'

const Layout = ({children}) => {

    return (
        <>
            <Header />
                {children}
            <Footer />
        </>
    )
}

export default Layout
