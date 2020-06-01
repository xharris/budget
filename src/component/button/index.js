import React from "react"
import PropTypes from "prop-types"

import app_svg from "svg"

import styled from "styled-components"
import { darken } from "polished"
import "./button.scss"

const S = {
  Button: styled.button`
    ${props =>
      props.color
        ? `
    .material-icons {
      color: ${props.color};
    }

    &:hover .material-icons {
      color: ${darken(0.2, props.color)};
    }
    `
        : ""}
  `
}

const Button = ({
  type,
  icon,
  label,
  title,
  selected,
  onClick,
  themed,
  color,
  svg,
  round
}) => (
  <S.Button
    type={type}
    className={`c-button 
      ${themed ? "themed" : ""} 
      ${selected ? "selected" : ""} 
      ${label ? "labeled" : ""} 
      ${round ? "round" : ""}`}
    onClick={onClick}
    color={color}
    title={title}
  >
    {icon ? (
      [
        <i key="icon" className={`material-icons ${icon}`} />,
        <span key="label" className="label">
          {label}
        </span>
      ]
    ) : svg ? (
      <img src={app_svg[svg]} alt={svg} />
    ) : null}
  </S.Button>
)

Button.defaultProps = {
  type: "button",
  icon: "",
  svg: "",
  label: "",
  title: "",
  selected: false,
  onClick: () => {},
  themed: false,
  color: null,
  round: false
}

Button.propTypes = {
  type: PropTypes.string,
  icon: PropTypes.string,
  svg: PropTypes.string,
  label: PropTypes.string,
  title: PropTypes.string,
  selected: PropTypes.bool,
  onClick: PropTypes.func,
  themed: PropTypes.bool,
  color: PropTypes.string,
  round: PropTypes.bool
}

export default Button
