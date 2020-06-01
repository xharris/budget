const path = require("path")

module.exports = {
  target: "node",
  resolve: {
    modules: ["node_modules", path.resolve("./src")],
    alias: {
      "@style": path.resolve("./src/style")
    }
  }
}
