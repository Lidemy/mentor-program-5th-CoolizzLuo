import { useContext, useEffect, useRef } from 'react'
import { useHistory } from 'react-router-dom'

import { toast } from 'react-toastify'

import useFetch from '../../hooks/useFetch'
import usePagination from '../../hooks/usePagination'
import Pagination from '../../components/Pagination'
import { AuthContext } from '../../context'
import Post from './Post'


const FetchPosts = ({ defaultPage = 1 }) => {
  const { userList, setPostData } = useContext(AuthContext)
  const history = useHistory()
  const toastId = useRef(null)
  const { loading, error, data = [] } = useFetch(`${process.env.REACT_APP_BASE_URL}/posts?_sort=createdAt&_order=desc`)
  const { currPage, setCurrPage, totalPage, pageData } = usePagination(data, defaultPage, process.env.REACT_APP_PER_PAGE_ITEM)

  useEffect(() => {
    loading ? (toastId.current = toast.loading('loading...')) : toast.dismiss(toastId.current)
    return () => toast.dismiss(toastId.current)
  }, [loading])

  useEffect(() => {
    if (error) toast.error('Network error')
  }, [error])

  useEffect(() => {
    if (!totalPage) return
    if (defaultPage > totalPage || defaultPage < 1) {
      toast.error('Maximum number of pages exceeded', { position: "top-right", autoClose: 2000, hideProgressBar: true })
      setCurrPage(1)
    }
  }, [defaultPage, totalPage, setCurrPage])

  useEffect(() => history.push('/?page=' + currPage), [history, currPage])
  useEffect(() => setPostData(data), [setPostData, data])

  return (
    !loading &&
    <>
      {pageData.map(post => <Post key={post.id} post={post} userList={userList} />)}
      <Pagination
        totalPage={totalPage}
        currentPage={currPage}
        setCurrentPage={setCurrPage}
        siblingCount={0}
      />
    </>
  )
}

export default FetchPosts
