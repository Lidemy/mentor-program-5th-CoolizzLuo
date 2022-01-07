import { useState, useMemo } from 'react'


const usePagination = (data, initialPage = 1, initialPageSize = 5) => {
  const [currPage, setCurrPage] = useState(Number(initialPage))
  const totalPage = useMemo(() => Math.ceil(data.length / initialPageSize), [data, initialPageSize])
  const pageData = useMemo(() => {
    return data.slice((currPage - 1) * initialPageSize, currPage * initialPageSize)
  }, [data, currPage, initialPageSize])

  return { currPage, setCurrPage, totalPage, pageData }
}

export default usePagination
