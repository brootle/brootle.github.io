import React from "react"
import { useStaticQuery, graphql, Link } from "gatsby"

//import { menu } from "../../content/docs-map.json"

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
                            dir
                        }
                        fields {
                            slug
                        }                        
                    }
                }
            }
        }
    `)    

    // check URL against List of URL, it is unique if we find it only once
    function isUrlUniqueInUrlsList(url, urlList){
        let counter = -1
        urlList.forEach(item => {
            if(item.includes(url)){
                counter++
            }
        })
        return !counter
    }    

    function findAllSectionPostsInList(section, nodes){
        // posts will have matching urls /Tutorials/Storage/Qencode-Storage/  
        let posts = nodes.map(( {url, name} ) => {
            return {
                dir: url,
                name
            }
        })
        posts = posts.filter( ({ dir }) => dir.includes(section) && dir !== section)   
        
        // replace  "/Tutorials/Storage/Third-Party-Storage/microsoft-azure/" with "microsoft-azure"
        posts = posts.map(({ dir, name }) => {
            dir = dir.slice(1, -1).split('/')[3]
            return {
                dir: dir,
                name
            }
        })
            
        return posts
    }      


    let menu_from_data = []   

    let urlList = []

    let nodes = data.allMarkdownRemark.edges.map( ({ node }) => {
        urlList.push(node.fields.slug)
        return {
            url: node.fields.slug,
            name: node.frontmatter.dir
        } 
    })      

    // add top level Docs first
    nodes.forEach( ({ url, name }) => {
        let urlArray = url.slice(1, -1).split('/')
        if(urlArray.length === 1){
            menu_from_data.push({
                "name": name,
                "dir": urlArray[0],
                "categories":[]                
            })
        }
    })   
    
    // add categories
    nodes.forEach( ({ url, name }) => {
        let urlArray = url.slice(1, -1).split('/')
        if(urlArray.length === 2){
            // find relevant Doc and add categories in there 
            menu_from_data.forEach(({ dir }, index) => {
                if(urlArray[0] === dir){
                    menu_from_data[index].categories.push({
                        "name": name,
                        "dir": urlArray[1],
                        "sections":[],
                        "posts":[]
                    })
                }
                
            })
        }
    })      

    // add sections[] and posts[] inside categories
    nodes.forEach( ({ url, name }) => {
        let urlArray = url.slice(1, -1).split('/')
        if(urlArray.length === 3){
            // if this part of URL is unique in URL list, this is POST
            // otherwise this is sectio
            // if URL is unique in the URLs list, push it to posts array of their category
 
            if(isUrlUniqueInUrlsList(url, urlList)){
                // find relevant Doc
                menu_from_data.forEach(({ dir }, index) => {
                    if(urlArray[0] === dir){
                        // find relevant category
                        menu_from_data[index].categories.forEach((category) => {
                            if(category.dir === urlArray[1]){
                                category.posts.push({
                                    "name": name,
                                    "dir": urlArray[2]
                                })
                            }
                        })
                    }                     
                })      
            } else{
                // find all posts relvant to this section and add them also      
                let posts = []
                posts = findAllSectionPostsInList(url, nodes)

                // this is a name of section, push it to the array of sections
                // find relevant Doc
                menu_from_data.forEach(({ dir }, index) => {
                    if(urlArray[0] === dir){
                        // find relevant category
                        menu_from_data[index].categories.forEach((category) => {
                            if(category.dir === urlArray[1]){          
                                category.sections.push({
                                    "name": name,
                                    "dir": urlArray[2],
                                    posts: posts
                                })                                
                            }
                        })
                    }                     
                }) 
            }    
  
        }
    })      



    // BUILDING UI
    const menu = menu_from_data

    //let menu_items = menu.map( (item, index) => 
    // let menu_items = menu_from_data.map( (item, index) => 
    let menu_items = menu.map( (item, index) => 
        <li key={index}>
            <Link 
                to={`/${item.dir}/`}
                activeClassName={sidebarStyles.active}
                partiallyActive={true}
            >
                {item.name}
            </Link>      

            <ul className={sidebarStyles.section}>
                {item.categories.map((category, index) => (
                    <li key={index}>
                        <Link 
                            to={`/${item.dir}/${category.dir}/`}
                            activeClassName={sidebarStyles.active}
                            partiallyActive={true}
                        >
                            {category.name}
                        </Link>   

                        <ul className={sidebarStyles.section}>                            
                            {category.sections.map((section, index) => (
                                <li key={index}>
                                    <Link 
                                        to={`/${item.dir}/${category.dir}/${section.dir}/`}
                                        activeClassName={sidebarStyles.active}
                                        partiallyActive={true}
                                    >
                                        {section.name}
                                    </Link>  

                                    <ul className={sidebarStyles.section}>                            
                                        {section.posts.map((post, index) => (
                                            <li key={index}>
                                                <Link 
                                                    to={`/${item.dir}/${category.dir}/${section.dir}/${post.dir}/`}
                                                    activeClassName={sidebarStyles.active}
                                                >
                                                    {post.name}
                                                </Link>   
                                            </li>
                                        ))}                            
                                    </ul>                                    

                                </li>
                            ))}

                            {category.posts.map((post, index) => (
                                <li key={index}>
                                    <Link 
                                        to={`/${item.dir}/${category.dir}/${post.dir}/`}
                                        activeClassName={sidebarStyles.active}
                                    >
                                        {post.name}
                                    </Link>   
                                </li>
                            ))}                            
                        </ul>

                    </li>
                ))}
            </ul>

        </li>        
    )    


    return (
        <nav className={sidebarStyles.sidebar}>
            <ul>{menu_items}</ul>
        </nav>
    )
}









