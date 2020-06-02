import React, { useState } from "react"
import PropTypes from "prop-types"

import { ProjectContext } from "component/projectcontext"
import Search from "component/search"
import Button from "component/button"

import getCurrentWindow, { openDevTools } from "component/electronutil"

import "./header.scss"

export const view = {
  home: 0,
  transactions: 1
}

const WindowButtons = () => {
  const [isMaximized, setMaximized] = useState(false)

  const maximize = () => {
    if (isMaximized) getCurrentWindow().unmaximize()
    else getCurrentWindow().maximize()
    setMaximized(!isMaximized)
  }

  return (
    <div className="c-windowbuttons win-nodrag">
      <Button icon="code" onClick={openDevTools} />
      <Button icon="remove" onClick={() => getCurrentWindow().minimize()} />
      <Button icon="crop_square" onClick={maximize} />
      <Button themed icon="close" onClick={() => getCurrentWindow().close()} />
    </div>
  )
}

const Header = ({ onViewSelect, defaultView }) => {
  const [viewSelected, setViewSelected] = useState(defaultView)

  const selectView = t => {
    setViewSelected(t)
    onViewSelect(t)
  }

  return (
    <div className="c-header win-drag">
      <div className="title">BlankE Finance</div>
      <div className="tools">
        <Button
          icon="home"
          label="Home"
          round
          selected={viewSelected === view.home}
          onClick={() => selectView(view.home)}
        />
        <Button
          icon="account_balance"
          label="Transactions"
          round
          selected={viewSelected === view.transactions}
          onClick={() => selectView(view.transactions)}
        />
      </div>
      <WindowButtons />
    </div>
  )
}

export default Header

Header.defaultProps = {
  onViewSelect: () => {},
  defaultView: view.home
}

Header.propTypes = {
  onViewSelect: PropTypes.func,
  defaultView: PropTypes.number
}
