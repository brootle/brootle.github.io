import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

export default function Home({ data }) {
  return (
    <Layout>
      <SEO title={data.site.siteMetadata.title} description={data.site.siteMetadata.description} />
      <div>Index Page Content</div>
    </Layout>
  );
}

export const query = graphql`
  query {
    site {
      siteMetadata {
        title
        description
      }
    }
  }
`