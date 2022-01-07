import styled from '@emotion/styled'

import FetchPosts from './FetchPosts'


const Wrapper = styled.div`
  width: 100%;
  padding: 0 .5rem;
`


const HomePage = ({ location }) => {
  const query = new URLSearchParams(location.search)
  const page = query.get('page') || 1


  return (
    <Wrapper>
      <FetchPosts defaultPage={page} />
    </Wrapper>
  )
}

export default HomePage
