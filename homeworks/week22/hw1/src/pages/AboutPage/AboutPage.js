import styled from '@emotion/styled'


const Container = styled.div`
  margin: 2rem auto 0;
  padding: 2rem;
  font-size: calc(20px + 0.33vw);
  text-align: left;
`

const AboutPage = () => {
  return (
    <Container>
      <h1>Hello</h1>
      <h3>我是 Enzo</h3>
      <p>是一名系統維運工程師，興趣寫 coding</p>
      <p>年後準備轉職成軟體開發工程師</p>
      <p>這邊以後會轉型成技術部落格. 也許吧</p>
    </Container>
  )
}

export default AboutPage
