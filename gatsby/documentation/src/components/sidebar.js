import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import _ from "lodash"

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
                            category_title
                            category_weight
                            post_title
                            post_weight
                            section_title
                            section_weight
                        }
                        fields {
                            slug
                        }                        
                    }
                }
            }
        }
    `)    
    
    console.log("Data is sidebar: ", data)

    let menu_items = data.allMarkdownRemark.edges.map( ({ node }) => {
        return {
            url: node.fields.slug,
            name: node.frontmatter.post_title
        } 
    })    

    console.log("menu_items: ", menu_items)

    return (
        <nav className={sidebarStyles.sidebar}>
            navigation       
        </nav>
    )
}















    // // TODO build menu tree 
    // // get list of categories with their names and weight and sort in desc order by weight
    // let categories = data.allMarkdownRemark.edges.map( ({ node }) => {
    //     return {
    //         category_name: node.frontmatter.category_title,
    //         category_weight: node.frontmatter.category_weight, 
    //         url: node.fields.slug, 
    //     }
    // })
    // categories = _.uniqWith(categories, function(first, second){
    //     return first.category_name === second.category_name
    // });
    // categories = _.remove(categories, function(element) {
    //     return element.category_name != null;
    // });    
    // categories = _.sortBy(categories, 'category_weight').reverse();
    // console.log(categories);

    // //{category_name: "Tutorials", category_weight: 10, url: "/Tutorials/"}
    // //{category_name: "API Reference", category_weight: 9, url: "/API-Reference/"}

    // // category -> Tutorials
    // // get list of all Sections -> section_title: "Transcoding"
    // let sections = data.allMarkdownRemark.edges.map( ({ node }) => {
    //     return {
    //         category_name: node.frontmatter.category_title,
    //         section_title: node.frontmatter.section_title,
    //         section_weight: node.frontmatter.section_weight, 
    //         url: node.fields.slug, 
    //     }
    // })    

    // sections = _.uniqWith(sections, function(first, second){
    //     return first.section_title === second.section_title
    // });    
    // console.log("sections: ", sections);