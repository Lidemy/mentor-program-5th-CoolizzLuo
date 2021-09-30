import styled from 'styled-components'
import { ARTHUR, ARTHUR_MAIL, COPYRIGHT_YEAR } from '../constants/data'

const FooterWrapper = styled.footer`
  position: relative;
  bottom: 0;
  right: 0;
  left: 0;
  letter-spacing: 0.05rem;
  background: transparent;
  text-align: center;
  padding: 0.1rem 0.5rem;
  margin-top: 4rem;
  user-select: none;
  /* z-index: -1; */

  span {
    display: block;
    font-size: 1.5rem;
    font-weight: 300;
    margin-bottom: 0.7rem;
    margin-top: 0.2rem;
  }

  a {
    color: #6a89cc;
    text-decoration: none;
    font-style: italic;
  }
`

const Footer = () => (
  <FooterWrapper>
    <span>&copy; copyright {COPYRIGHT_YEAR} by <a href={`mailto:${ARTHUR_MAIL}`}>{ARTHUR}</a></span>
  </FooterWrapper>
)

export default Footer