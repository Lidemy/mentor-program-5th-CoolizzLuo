import { useContext, useEffect, useRef } from 'react'
import { useHistory, Link } from 'react-router-dom'

import styled from '@emotion/styled'
import { toast } from 'react-toastify'

import useFetch from '../../hooks/useFetch'
import { AuthContext } from '../../context'
import { timeParser, userParser } from '../../utils'
import { removePostById } from '../../WebAPI'


const Table = styled.table`
  font-size: .8rem;
  margin: 2rem 0 1rem;
  border-collapse: collapse;
  text-indent: initial;
  border-spacing: 2px;
  width: 100%;
  background: #fff;

  th, td {
    border: 2px solid #dfdfe0;
  }

  th {
    background: #428bca;
    color: #FFF;
    padding: 8px 0;
  }

  td {
    padding: 4px 20px;
  }
`

const TitleLink = styled(Link)`
  color: #428bca;
  font-weight: 700;
`

const Button = styled.button`
  color: #fff;
  padding: 4px 6px;
  background-color: #888;
  border: transparent;
  border-radius: 4px;
  cursor: pointer;
`

const ConsolePage = () => {
  const { userList } = useContext(AuthContext)
  const history = useHistory()
  const toastId = useRef(null)
  const { loading, error, data = [] } = useFetch(`https://student-json-api.lidemy.me/posts?_sort=createdAt&_order=desc`)
  const handleDeletePost = async (id) => {
    if (!window.confirm('Are you sure delete this post ?')) return
    toast.promise(
      removePostById(id),
      {
        pending: 'Loading...',
        success: {
          render({ data }) {
            history.go(0)
            return 'Delete Successful !'
          }
        },
        error: {
          render({ data }) {
            return 'Delete Fail !'
          }
        }
      }, { autoClose: 3000 }
    )
  }


  useEffect(() => {
    loading ? (toastId.current = toast.loading('loading...')) : toast.dismiss(toastId.current)
    return () => toast.dismiss(toastId.current)
  }, [loading])

  useEffect(() => {
    if (error) toast.error('Network error')
  }, [error])

  return (
    !loading &&
    <>
      <Table col={5}>
        <thead>
          <tr>
            <th>No.</th>
            <th>Title</th>
            <th>Author</th>
            <th>Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {
            data.map(({ id, title, userId, createdAt }, index) => (
              <tr key={id}>
                <td>{index + 1}</td>
                <td>
                  <TitleLink to={`/post/${id}`} title={title} >
                    {title.length < 8 ? title : `${title.substring(0, 8)}...`}
                  </TitleLink>
                </td>
                <td>{userParser(userList, userId)?.username.substring(0, 8)}</td>
                <td>{timeParser(createdAt)}</td>
                <td>
                  <Button onClick={() => handleDeletePost(id)}>刪除</Button>
                </td>
              </tr>
            ))
          }
        </tbody>
      </Table>
    </>
  )
}

export default ConsolePage
