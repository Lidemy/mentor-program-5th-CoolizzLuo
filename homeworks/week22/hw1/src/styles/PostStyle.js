import styled from '@emotion/styled'
import { Link } from 'react-router-dom'


const PostContainer = styled.article`
  position: relative;
  background: #fff;
  padding: 1.2rem 1.6rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  border-radius: 6px;
  box-shadow: 0 1px 2px rgb(0 0 0 / 10%);
  overflow: auto;
`

const PostHead = styled.header`
  width: 100%;
  text-align: left;
  border-bottom: 1px solid rgba(0, 12, 34, 0.2);
`

const PostBody = styled.section`
  font-size: .8rem;
  text-align: left;
  margin: 1rem 0;
`

const PostTitle = styled(Link)`
  display: block;
  font-size: 1rem;
  font-weight: 700;
  color: #428bca;
  text-decoration: none;
  overflow: hidden;
`

const PostInfo = styled.div`
  display: flex;
  font-size: .6rem;
  padding: .4rem 0;

  path, span {
    color: #aaa;
  }

  svg {
    margin-right: .2rem;
  }

  span {
    margin-right: .8rem;
  }
`

const PostAuthor = styled.span`
  font-weight: 500;
`

const PostDate = styled.span`
`

const PostTag = styled.span`
`

const ReadMoreBtn = styled(Link)`
  position: absolute;
  right: 1.6rem;
  bottom: .8rem;
  font-size: .6rem;
  color: #338ccc;

  &:hover {
    font-weight: 700;
    box-shadow: ;
  }
`

export {
  PostContainer,
  PostHead,
  PostBody,
  PostTitle,
  PostInfo,
  PostAuthor,
  PostDate,
  PostTag,
  ReadMoreBtn
}
