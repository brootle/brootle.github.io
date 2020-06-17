import React from "react"
import { Link } from "gatsby"

import headerStyles from "./header.module.css"

export default function Header() {
    return (
        <header className={headerStyles.header}>
            <div>
                <Link to='/'>Logo</Link> 
            </div>
            
            <div>
                <a href='https://portal.qencode.com/login' target='_blank' rel='noreferrer'>Sign In</a>
                <a href='https://portal.qencode.com/signup' target='_blank' rel='noreferrer'>Get Started</a>
            </div>                      
        </header>
    )
}