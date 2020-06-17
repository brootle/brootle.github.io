import React from "react"
import Header from "./header"

import "normalize.css"

export default function Layout({ children }) {  
    return (
        <>
            <Header />
            <main>
                {children}
            </main>
        </>
    )
}
