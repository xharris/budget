import React from "react"
import PropTypes from "prop-types"

import "./tag.scss"

const Tag = ({ value, onClick }) => (
  <button className="c-tag" onClick={onClick}>{`#${value}`}</button>
)

Tag.defaultProps = {
  value: "",
  onClick: () => {}
}

Tag.propTypes = {
  value: PropTypes.string,
  onClick: PropTypes.func
}

export default Tag
