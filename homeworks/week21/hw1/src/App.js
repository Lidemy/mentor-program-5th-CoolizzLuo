import './App.css'
import styled from 'styled-components'
import TodoApp from './components/TodoApp'
import { TITLE_DESCRIPTION, ARTHUR, ARTHUR_MAIL, COPYRIGHT_YEAR } from './constants/data'

const Container = styled.div`
  margin: 4rem auto;
  padding: 2rem 3rem 0;
  max-width: 500px;
  color: #fff;
  background: #6a89cc;
  border-radius: 8px;
  border: 1px solid #ccc;
  box-shadow: 20px -20px 0px 0px rgba(100, 100, 100, 0.1);
`

const Header = styled.header`
  h1 {
    font-size: 2.6rem;
    font-weight: 700;
    letter-spacing: 0.1rem;
    margin-bottom: 0.6rem;
    border-bottom: 1px solid #ccc;
  }

  span {
    display: block;
    font-size: 0.8rem;
    font-weight: 300;
    margin-bottom: 0.7rem;
    margin-top: 0.2rem;
  }
` 

const Footer = styled.footer`
  letter-spacing: 0.05rem;
  background: #6a89cc;
  text-align: center;
  margin-top: 3rem;
  padding: 0.1rem 0.5rem;

  span {
    display: block;
    font-size: .9rem;
    font-weight: 300;
    margin-bottom: 0.7rem;
    margin-top: 0.2rem;
  }

  a {
    color: #f9ca24;
    text-decoration: none;
    font-weight: 700;
    font-style: italic;
  }
`

function App() {
  return (
    <Container>
      <Header>
        <h1>Todo List
          <span>{TITLE_DESCRIPTION}</span>
        </h1>
      </Header>
      <TodoApp/>
      <Footer>
        <span>&copy; copyright {COPYRIGHT_YEAR} by <a href={`mailto${ARTHUR_MAIL}`}>{ARTHUR}</a></span>
      </Footer>
    </Container>
  );
}

export default App
