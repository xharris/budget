// eslint-disable-next-line import/no-self-import
const { app, BrowserWindow, shell } = require("electron")

const path = require("path")
const url = require("url")

let mainWindow

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    frame: false,
    show: false,
    webPreferences: {
      nodeIntegration: true,
      preload: path.resolve(__dirname, "./preload.js")
    }
  })
  mainWindow.webContents.openDevTools()
  mainWindow.loadURL(
    process.env.ELECTRON_START_URL ||
      url.format({
        pathname: path.join(__dirname, "/../public/index.html"),
        protocol: "file:",
        slashes: true
      })
  )

  mainWindow.on("closed", () => {
    mainWindow = null
  })

  mainWindow.webContents.on("new-window", (e, _url) => {
    e.preventDefault()
    console.log(_url)
    if (_url.length > 1) shell.openExternal(_url)
  })

  mainWindow.once("ready-to-show", () => {
    mainWindow.show()
  })
}

app.on("ready", createWindow)

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit()
  }
})

app.on("activate", () => {
  if (mainWindow === null) {
    createWindow()
  }
})
