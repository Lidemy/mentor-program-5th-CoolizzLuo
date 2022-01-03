import styled from '@emotion/styled/macro'


const Wrapper = styled.div`
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  inset: 0;
  background: rgba(0, 0, 0, .5);
  backdrop-filter: blur(2px);
  transition: all .2s;
  z-index: 99;
`

const Modal = ({ children }) => (
  <Wrapper>
    {children}
  </Wrapper>
)


export default Modal
