import React, { useState } from "react"
import PropTypes from "prop-types"

import DatePicker from "react-datepicker"

import "react-datepicker/dist/react-datepicker.css"
import "./mydatepicker.scss"

const MyDatePicker = ({ title, defaultDate, onChange }) => {
  const [date, setDate] = useState(defaultDate)

  const changeDate = new_date => {
    setDate(new_date)
    onChange(new_date)
  }

  const CustomInput = ({ value, onClick }) => (
    <input
      title={title}
      type="text"
      className="react-datepicker-ignore-onclickoutside"
      value={value}
      onClick={onClick}
    />
  )

  return (
    <div className="c-datepicker">
      <DatePicker
        selected={date}
        onChange={changeDate}
        customInput={<CustomInput />}
      />
    </div>
  )
}

MyDatePicker.defaultProps = {
  title: "",
  defaultDate: null,
  onChange: () => {}
}

MyDatePicker.propTypes = {
  title: PropTypes.string,
  defaultDate: PropTypes.instanceOf(Date),
  onChange: PropTypes.func
}

export default MyDatePicker
