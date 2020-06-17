import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"

export default function DocPost({ data }) {
    const document = data.markdownRemark
    return (
        <Layout>
            <div>
                <h1>{document.frontmatter.category_title}</h1>
                <h2>{document.frontmatter.section_title}</h2>
                <h3>{document.frontmatter.post_title}</h3>
                <div dangerouslySetInnerHTML={{ __html: document.html }} />
            </div>
        </Layout>
    )
}

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        category_title
        section_title
        post_title
      }
    }
  }
`