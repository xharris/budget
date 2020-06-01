const { Menu, MenuItem, getCurrentWindow } = window.require("electron").remote

export const contextMenu = (x, y, items) => {
  const menu = new Menu()
  for (let i = 0; i < items.length; i++) {
    menu.append(new MenuItem(items[i]))
  }
  menu.popup({ x, y })
  return menu
}

export default getCurrentWindow

export const openDevTools = () => getCurrentWindow().webContents.openDevTools()
