import React from "react"
import { Link } from "gatsby"

export default function Home() {
  return (
    <div>
      <h1>Header</h1>      
      <Link to="/contact/">Contact</Link>
      <p>some text</p>
    </div>
  )
}
