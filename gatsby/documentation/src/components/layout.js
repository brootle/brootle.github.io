import React from "react"
import Header from "./header"
import Sidebar from "./sidebar"

export default function Layout({ children }) {  
    return (
        <>
            <Header />
            <Sidebar />
            {children}
        </>
    )
}
