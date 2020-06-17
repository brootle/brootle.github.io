import React from "react"
import { useStaticQuery, graphql } from "gatsby"

import sidebarStyles from "./sidebar.module.css"

export default function Sidebar() {
    const data = useStaticQuery(graphql`
        query {
            allMarkdownRemark {
                totalCount
                edges {
                    node {
                        id
                        frontmatter {
                            post_title
                        }
                    }
                }
            }
        }
    `)    
    console.log("Data is sidebar: ", data)
    return (
        <nav className={sidebarStyles.sidebar}>
            navigation       
        </nav>
    )
}