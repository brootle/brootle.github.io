import React from "react"
import { graphql } from "gatsby"

import SEO from "../components/seo"
import Layout from "../components/layout"
import Sidebar from "../components/sidebar"

import docPostStyles from "./doc-post.module.css"

export default function DocPost({ data }) {
    const document = data.markdownRemark
    return (
        <Layout>
            <SEO title={document.frontmatter.post_title} description={document.excerpt} />
            <div className={docPostStyles.article}>
                <h3>{document.frontmatter.post_title}</h3>
                <div dangerouslySetInnerHTML={{ __html: document.html }} />
            </div>

            <Sidebar />
        </Layout>
    )
}

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        post_title
      }
    }
  }
`