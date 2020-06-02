import React, { useState, useRef } from "react"
import PropTypes from "prop-types"

import "./search.scss"

const Search = ({ className, placeholder, disabled }) => {
  const [hovering, setHovering] = useState(false)
  const [focused, setFocused] = useState(false)
  const el_input = useRef()

  return (
    <div
      className={[
        "c-search",
        disabled
          ? "win-drag"
          : (hovering || focused) && !disabled
          ? "active win-nodrag"
          : "win-nodrag",
        disabled ? "disabled" : "",
        className
      ].join(" ")}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      <i className="material-icons">search</i>
      <input
        ref={el_input}
        disabled={disabled}
        placeholder={
          (hovering || focused) && !disabled ? "Search" : placeholder
        }
        onFocus={() => setFocused(true)}
        onBlur={() => {
          setFocused(false)
          if (el_input.current) {
            el_input.current.value = ""
          }
        }}
      />
    </div>
  )
}

Search.defaultProps = {
  className: "",
  placeholder: "Search",
  disabled: false
}

Search.propTypes = {
  className: PropTypes.string,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool
}

export default Search
