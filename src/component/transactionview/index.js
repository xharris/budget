import React, { useState, useEffect } from "react"

import styled from "styled-components"

import Search from "component/search"
import MyDatePicker from "component/mydatepicker"
import TransactionTable from "./table"
import "./transactionview.scss"

const S = {
  TransactionView: styled.div``
}

const createData = (id, date, from, to, tags, amount, balance) => ({
  id,
  date,
  from,
  to,
  tags,
  amount,
  balance
})

const TransactionView = () => {
  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState(new Date())

  const getData = () =>
    "."
      .repeat(100)
      .split("")
      .map((v, i) =>
        createData(
          i,
          "3/02/2001",
          "Cap One / Checking",
          `Chipotle${i}`,
          ["Fast Food", "Yea"],
          -(8 + i) + 0.26,
          4046 - i + 0.32
        )
      )

  return (
    <S.TransactionView className="c-transactionview">
      <div className="sub-header">
        <div className="date-pickers">
          <MyDatePicker title="Start Date" defaultDate={new Date()} />
          <span>-</span>
          <MyDatePicker title="End Date" defaultDate={new Date()} />
        </div>
        <Search />
      </div>
      <TransactionTable
        data={getData}
        defaultWidths={{
          date: 0.15,
          from: 0.2,
          to: 0.125,
          tags: 0.3,
          amount: 0.1,
          balance: 0.1
        }}
      />
    </S.TransactionView>
  )
}

export default TransactionView
