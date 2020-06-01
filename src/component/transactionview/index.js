import React, { useState, useEffect } from "react"

import { Column, Table, AutoSizer } from "react-virtualized"
import Draggable from "react-draggable"

import Tag from "component/tag"
import Money from "component/money"
import { capitalize } from "component/util"

import styled from "styled-components"
import "react-virtualized/styles.css"
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

/*
case 3: // tags
  return col.map(t => <Tag key={t} value={t} />)
case 4:
  return <Money amt={col} sign={col < 0 ? -1 : 0} />
case 5:
  return <Money amt={col} />
*/

const headers = ["date", "from", "to", "tags", "amount", "balance"]

const TransactionView = () => {
  const [widths, setWidths] = useState({
    date: 0.165,
    from: 0.165,
    to: 0.165,
    tags: 0.165,
    amount: 0.165,
    balance: 0.165
  })
  const [totalWidth, setTotalWidth] = useState(0)

  const list = React.useMemo(
    () =>
      "."
        .repeat(100)
        .split("")
        .map(() =>
          createData(
            0,
            "3/02/2001",
            "Cap One / Checking",
            "Chipotle",
            ["Fast Food", "Yea"],
            -8.26,
            4046.32
          )
        ),
    []
  )

  const resizeRow = ({ dataKey, deltaX }) => {
    const percentDelta = deltaX / totalWidth

    // This is me being lazy :)
    const nextDataKey = headers[headers.indexOf(dataKey) + 1]

    setWidths({
      ...widths,
      [dataKey]: widths[dataKey] + percentDelta,
      [nextDataKey]: widths[nextDataKey] - percentDelta
    })
  }

  const headerRenderer = ({ dataKey, label }) => (
    /* {
       columnData,
    dataKey,
    disableSort,
    label,
    sortBy,
    sortDirection
    } */
    <React.Fragment key={dataKey}>
      <div className="ReactVirtualized__Table__headerTruncatedText">
        {label}
      </div>
      {dataKey !== headers.slice(-1)[0] && (
        <Draggable
          axis="x"
          defaultClassName="DragHandle"
          defaultClassNameDragging="DragHandleActive"
          onDrag={(event, { deltaX }) =>
            resizeRow({
              dataKey,
              deltaX
            })
          }
          position={{ x: 0 }}
          zIndex={999}
        >
          <span className="DragHandleIcon no-select">⋮</span>
        </Draggable>
      )}
    </React.Fragment>
  )

  const rowRenderer = ({ key, index, style, className, columns }) => (
    <div
      key={key}
      className={`${className} ${index % 2 === 0 ? "odd" : "even"}`}
      aria-rowindex={index}
      style={style}
      role="row"
    >
      {columns}
    </div>
  )

  const cellRenderer = ({ cellData, dataKey }) =>
    dataKey === "tags" ? (
      cellData.map(t => <Tag key={t} value={t} />)
    ) : dataKey === "amount" ? (
      <Money amt={cellData} sign={cellData < 0 ? -1 : 0} />
    ) : dataKey === "balance" ? (
      <Money amt={cellData} />
    ) : (
      cellData
    )

  return (
    <S.TransactionView className="c-transactionview">
      <div className="sub-header">
        <div className="date">March &#39;01</div>
      </div>
      <div className="table-container">
        <AutoSizer>
          {({ height, width }) => {
            setTotalWidth(width)
            return (
              <Table
                width={Math.max(width, 0)}
                height={height - 20}
                headerHeight={20}
                rowHeight={30}
                rowRenderer={rowRenderer}
                rowCount={list.length}
                rowGetter={({ index }) => list[index]}
              >
                {headers.map((h, i) => (
                  <Column
                    key={h}
                    headerRenderer={headerRenderer}
                    cellRenderer={cellRenderer}
                    dataKey={h}
                    label={capitalize(h)}
                    width={widths[h] * width - 16}
                  />
                ))}
              </Table>
            )
          }}
        </AutoSizer>
      </div>
    </S.TransactionView>
  )
}

export default TransactionView
