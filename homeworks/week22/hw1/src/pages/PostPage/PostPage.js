import { useCallback, useContext, useMemo } from 'react'
import { Link, useParams } from 'react-router-dom'

import styled from '@emotion/styled'
import { toast } from 'react-toastify'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core'

import Modal from '../../components/Modal'
import { AuthContext } from '../../context'
import Post from './Post'
import FetchPost from './FetchPost'


library.add(fab)

const Container = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  font-size: .8rem;
  max-height: calc(100vh - 100px);
  width: 960px;
  padding: 0rem 1.25rem;
  margin: 4rem 0 0;
  border-radius: 10px;
  background: #eee;
  /* box-shadow: 0 0.5em 1em -0.125em rgb(10 10 10 / 10%), 0 0px 0 1px rgb(10 10 10 / 2%); */
`

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  margin: 0 -.5rem;
  font-size: 1.4rem;
  a {
    cursor: pointer;
  }
  path {
    color: #333;
    transition: all .1s;
    &:hover {
      color: #666;
      transform: scale(1.1)
    }
  }
`

const ArrowGroup = styled.div`
`

const ArrowLeftBtn = styled.a`
  ${({ $disable }) => $disable && `
    path {
      color: #ccc;
    }
  `}
`

const ArrowRightBtn = styled.a`
  margin-left: 1rem;
  ${({ $disable }) => $disable && `
    path {
      color: #ccc;
    }
  `}
`

const CloseBtn = styled(Link)`
  font-size: 1.6rem;
`

const PostPage = ({ history, location }) => {
  const { userList, postData } = useContext(AuthContext)
  const { id } = useParams()

  const postIndex = useMemo(() => postData.findIndex(post => Number(id) === post.id), [postData, id])
  const post = postData[postIndex]

  const handlePreviousPost = useCallback(() => {
    if (postIndex >= postData.length - 1) {
      toast.dismiss()
      toast.warn('已經是最古老的文章了！', { autoClose: 1000, hideProgressBar: true })
      return
    }
    history.push(`${postData[postIndex + 1].id}`)
  }, [history, postIndex, postData])

  const handleNextPost = useCallback(() => {
    if (postIndex <= 0) {
      toast.dismiss()
      toast.warn('已經是最新的文章了！', { autoClose: 1000, hideProgressBar: true })
      return
    }
    history.push(`${postData[postIndex - 1].id}`)
  }, [history, postIndex, postData])

  return (
    <Modal>
      <Container>
        <Nav>
          <ArrowGroup>
            {postIndex !== -1 && (
              <>
                <ArrowLeftBtn $disable={postIndex >= postData.length - 1} onClick={handlePreviousPost}>
                  <FontAwesomeIcon icon={faArrowLeft} />
                </ArrowLeftBtn>
                <ArrowRightBtn $disable={postIndex <= 0} onClick={handleNextPost}>
                  <FontAwesomeIcon icon={faArrowRight} />
                </ArrowRightBtn>
              </>
            )}
          </ArrowGroup>
          <CloseBtn to='/'>
            <FontAwesomeIcon icon={faTimes} />
          </CloseBtn>
        </Nav>
        {post ? <Post post={post} userList={userList} /> : <FetchPost postId={id} />}
      </Container>
    </Modal >
  )
}

export default PostPage
