import styled from "styled-components"

const FooterWrapper = styled.footer`
  text-align: center;
  font-size: .9rem;
  padding: 1rem 0;
  background: #000;
  border-top:2px solid #fad312;
  & > .copyright {
    color: #999;
  }
`

const Footer = () => {
  return (
    <FooterWrapper>
      <p className="copyright">&copy; 2020 &copy; Copyright. All rights Reserved.</p>
    </FooterWrapper>
  )
}

export default Footer