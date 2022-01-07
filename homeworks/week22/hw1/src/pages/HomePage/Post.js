import styled from '@emotion/styled/macro'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons'
import { faUserAlt } from '@fortawesome/free-solid-svg-icons'
import { faTags } from '@fortawesome/free-solid-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core'
import MDEditor from '@uiw/react-md-editor'

import { timeParser, userParser } from '../../utils'
import {
  PostContainer as Container,
  PostHead,
  PostBody,
  PostTitle,
  PostInfo,
  PostAuthor,
  PostDate,
  PostTag,
  ReadMoreBtn
} from '../../styles/PostStyle'


library.add(fab)

const PostContainer = styled(Container)`
  margin: 2rem 0;
`

const PostBodyEllipsis = styled(PostBody)`
  width: 100%;  
  word-wrap: break-word;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  line-clamp: 3;
  -webkit-line-clamp: 3;
  box-orient: vertical;
  -webkit-box-orient: vertical;
`

const Post = ({ post, userList }) => {
  const { id, title, body, userId, createdAt } = post

  return (
    <PostContainer>
      <PostHead>
        <PostTitle to={{ pathname: `/post/${id}`, state: { post } }}>{title}</PostTitle>
        <PostInfo>
          <PostDate>
            <FontAwesomeIcon icon={faCalendarAlt} />
            {timeParser(createdAt)}
          </PostDate>
          <PostAuthor>
            <FontAwesomeIcon icon={faUserAlt} />
            {userParser(userList, userId)?.username}
          </PostAuthor>
          <PostTag>
            <FontAwesomeIcon icon={faTags} />
            Lidemy Student
          </PostTag>
        </PostInfo>
      </PostHead>
      <PostBodyEllipsis>
        <MDEditor.Markdown source={body} />
      </PostBodyEllipsis>
      <ReadMoreBtn to={`/post/${id}`}>Read More</ReadMoreBtn>
    </PostContainer>
  )
}

export default Post
