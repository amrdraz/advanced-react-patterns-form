import React from "react"
import ReactDOM from "react-dom"
// 📋Overview and starting point
// import { Page } from "./examples/01"
// 📋Creating Compound Components and Form.Field Component
// import { Page } from "./examples/02";
// 📋RenderProp and Flexible Compunt Connecting with Context
// import { Page } from "./examples/03"
// 📋User HigherOrder Components to ease using our Form
// import { Page } from "./examples/04";
// 📋Final state
import { Page } from "./examples/05"
import "./styles.css"

function App() {
  return (
    <div className="App">
      <h1>Submit Rating</h1>
      <Page />
    </div>
  )
}

const rootElement = document.getElementById("root")
ReactDOM.render(<App />, rootElement)
