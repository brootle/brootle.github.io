import React from "react"
import { Link } from "gatsby"

import headerStyles from "./header.module.css"

import logo from "../images/logo.svg"

export default function Header() {
    return (
        <header className={headerStyles.header}>
            <div className="content-container">
                <div className={headerStyles.content}>
                    <div>
                        <Link to='/'>
                            <img className={headerStyles.logo} src={logo} alt="Qencode" />
                        </Link> 
                    </div>
                    
                    {/* <div>
                        <a href='https://portal.qencode.com/login' target='_blank' rel='noreferrer'>Sign In</a>
                        <a href='https://portal.qencode.com/signup' target='_blank' rel='noreferrer'>Get Started</a>
                    </div>   */}
                </div>
            </div>                    
        </header>
    )
}