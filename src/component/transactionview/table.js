import React, { useState, useEffect, useMemo } from "react"

import Tag from "component/tag"
import Money from "component/money"
import { capitalize } from "component/util"

import { Column, Table, AutoSizer } from "react-virtualized"
import Draggable from "react-draggable"

import "react-virtualized/styles.css"
import "./table.scss"

const headers = ["date", "from", "to", "tags", "amount", "balance"]

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

const TransactionTable = ({ data, defaultWidths }) => {
  const list = useMemo(data, [])
  const [widths, setWidths] = useState(defaultWidths)
  const [totalWidth, setTotalWidth] = useState(0)

  const checkRow = (key, pdelta) =>
    key === headers.slice(-1)[0]
      ? Object.values(widths)
          .slice(0, -1)
          .reduce((sum, x) => sum - x, 1)
      : widths[key] + pdelta

  const resizeRow = ({ dataKey, deltaX }) => {
    const percentDelta = deltaX / totalWidth
    const nextDataKey = headers[headers.indexOf(dataKey) + 1]

    setWidths({
      ...widths,
      [dataKey]: checkRow(dataKey, percentDelta),
      [nextDataKey]: checkRow(nextDataKey, -percentDelta)
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

  return (
    <div className="c-transaction-table">
      <AutoSizer>
        {({ height, width }) => {
          setTotalWidth(width + 42)
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
                  width={i === widths.length - 1 ? 0 : widths[h] * width - 16}
                />
              ))}
            </Table>
          )
        }}
      </AutoSizer>
    </div>
  )
}

export default TransactionTable
