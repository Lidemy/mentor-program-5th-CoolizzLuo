import styled from '@emotion/styled/macro'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core'

import useToggle from '../../../hooks/useToggle'
import Modal from '../../Modal'
import LoginForm from './LoginForm'
import RegisterForm from './RegisterForm'


library.add(fab)

const Wrapper = styled.div`
  position: relative;
  font-size: .8rem;
  width: 400px;
  padding: 1.5rem 1.25rem 1.25rem;
  margin: 3rem 0 0;
  border-radius: 10px;
  background: #fff;
  box-shadow: 0 0.5em 1em -0.125em rgb(10 10 10 / 10%), 0 0px 0 1px rgb(10 10 10 / 2%);
  user-select: none;
`

const BackBtn = styled.div`
  font-size: .7rem;
  position: absolute;
  top: 32px;
  left: 28px;
  cursor: pointer;

  & span {
    margin-left: 10px;
  }  
  &::after {
    content: '';
    position: absolute;
    bottom: -4px;
    right: 0;
    left: 0;
    width: 0%;
    height: 2px;
    /* background: #a29bfe; */
    background: #428bca;
    transition: width 1s .2s;
  }
  &:hover {
    font-weight: 700;
  }
  &:hover::after {
    width: 100%;
  }
`

const FormModal = ({ handleToggle }) => {
  const [isLoginForm, toggleForm] = useToggle(true)

  return (
    <Modal>
      <Wrapper>
        <BackBtn onClick={handleToggle}>
          <FontAwesomeIcon icon={faArrowLeft} />
          <span>Back</span>
        </BackBtn>
        {
          isLoginForm ?
            <LoginForm toggleModal={handleToggle} switchForm={toggleForm} /> :
            <RegisterForm toggleModal={handleToggle} switchForm={toggleForm} />
        }
      </Wrapper>
    </Modal>
  )
}

export default FormModal
