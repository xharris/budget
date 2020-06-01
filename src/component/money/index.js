import React from "react"
import PropTypes from "prop-types"

import "./money.scss"

const Money = ({ amt, sign }) => (
  <span
    className={`c-money ${sign < 0 ? "negative" : sign > 0 ? "positive" : ""}`}
  >{`${sign < 0 ? "-" : ""}$${Math.abs(amt)}`}</span>
)

Money.defaultProps = {
  amt: 0,
  sign: 0
}

Money.propTypes = {
  amt: PropTypes.number,
  sign: PropTypes.number
}

export default Money
