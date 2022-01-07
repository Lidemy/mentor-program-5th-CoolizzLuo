import { useContext, useEffect, useRef } from 'react'
import { useHistory } from 'react-router-dom'

import { toast } from 'react-toastify'

import useFetch from '../../hooks/useFetch'
import { AuthContext } from '../../context'
import Post from './Post'


const FetchPost = ({ postId }) => {
  const history = useHistory()
  const { userList } = useContext(AuthContext)
  const { loading, error, data } = useFetch(`${process.env.REACT_APP_BASE_URL}/posts/${postId}`)
  const toastId = useRef(null)

  useEffect(() => {
    loading ? (toastId.current = toast.loading('loading...')) : toast.dismiss(toastId.current)
    return () => toast.dismiss(toastId.current)
  }, [loading])

  useEffect(() => {
    if (error) {
      toast.error('Can\t found post')
      history.push('/')
    }
  }, [error, history])

  return (
    !loading && <Post post={data} userList={userList} />
  )
}

export default FetchPost
