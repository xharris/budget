import React, { createContext } from "react"

// import { id } from "component/util"

export const PluginContext = createContext({
  plugins: [],
  addPlugin: () => {}, // (path)
  getComponent: () => {} // (element type) -> Component
})
