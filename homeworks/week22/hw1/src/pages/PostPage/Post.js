import styled from '@emotion/styled'

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
} from '../../styles/PostStyle'


library.add(fab)

const PostContainer = styled(Container)`
  margin: .5rem 0 1rem;
  width: 100%;
  user-select: none;
`

const Post = ({ post, userList }) => {
  const { id, title, body, userId, createdAt } = post

  return (
    <PostContainer>
      <PostHead>
        <PostTitle to={`/post/${id}`}>{title}</PostTitle>
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
      <PostBody>
        <MDEditor.Markdown source={body} />
      </PostBody>
    </PostContainer>
  )
}

export default Post
