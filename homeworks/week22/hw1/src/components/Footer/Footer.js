import styled from '@emotion/styled/macro'


const FooterContainer = styled.footer`
  font-family: "Cyber", -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
  'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue';
  font-size: .8rem;
  padding: 16px 0 0;
  text-align: center;
  user-select: none;
  
  a {
    font-family: "Cyber", -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue';
    font-style: italic;
    color: #74b9ff;
  }
`

const Footer = () => (
  <FooterContainer>
    &copy; copyright 2021 by <a href={`https://github.com/CoolizzLuo`} target="_blank" rel="noreferrer">Enzo</a>
  </FooterContainer>
)


export default Footer
