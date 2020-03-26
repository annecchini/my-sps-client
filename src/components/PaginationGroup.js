import React from 'react'
import { Pagination } from 'react-bootstrap'

const PaginationGroup = props => {
  const { nPages, cPage, changePage } = props

  if (nPages === 1) return null

  const paginationSize = 5 //impar
  const pages = [...Array(paginationSize).keys()]
    .map(x => cPage + x - (paginationSize - 1) / 2)
    .filter(x => x > 0 && x <= nPages)

  return (
    <Pagination>
      <Pagination.First onClick={() => changePage(1, 10)} />

      <Pagination.Prev
        active={cPage > 1 ? true : false}
        onClick={() => {
          if (cPage - 1 > 0) return changePage(cPage - 1, 10)
          else return null
        }}
      />

      {pages[0] > 1 ? <Pagination.Ellipsis /> : null}

      {pages.map((x, key) => (
        <Pagination.Item key={key} active={x === cPage ? true : false} onClick={() => changePage(x, 10)}>
          {x}
        </Pagination.Item>
      ))}

      {pages[paginationSize - 1] < nPages ? <Pagination.Ellipsis /> : null}

      <Pagination.Next
        active={cPage < nPages ? true : false}
        onClick={() => {
          if (cPage + 1 <= nPages) return changePage(cPage + 1, 10)
          else return null
        }}
      />

      <Pagination.Last onClick={() => changePage(nPages, 10)} />
    </Pagination>
  )
}

export default PaginationGroup
