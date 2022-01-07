import { useContext } from 'react'

import { NavLink, useHistory } from 'react-router-dom'
import styled from '@emotion/styled/macro'
import { toast } from 'react-toastify'

import useToggle from '../../hooks/useToggle'
import FormModal from './FormModal'
import { AuthContext } from '../../context'
import { clearAuthToken } from '../../utils'


const HeaderContainer = styled.header`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
`

const NavbarList = styled.div`
  display: flex;
`

const Nav = styled(NavLink, {
  activeClassName: 'active',
})`
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  padding: 2px 12px;
  border-radius: 8px;
  cursor: pointer;
  color: #999;
  text-decoration: none;
  user-select: none;

  & + & {
    margin-left: 6px;
  }
  &.active {
    color: #000;
  }
  &:hover {
    color: #444;
    background: #ddd;
  }
`

const Span = styled.span`
  font-size: 1rem;
  font-weight: 700;
  margin-right: 1rem;
  user-select: none;
`

const UserBtn = styled.button`
  font-size: .8rem;
  font-weight: 700;
  padding: 2px 8px;
  /* background-color: #a29bfe; */
  /* background-color: #1877f2; */
  background-color: #428bca;
  border-color: transparent;
  border-radius: 4px;
  box-shadow: 2px 2px 2px #666;
  color: #fff;
  cursor: pointer;
  user-select: none;
  transition: all .3s;

  &:active {
    transform: translate(2px, 2px);
    box-shadow: none;
  }
`

const Header = () => {
  const [isModalOpen, toggleModal] = useToggle()
  const history = useHistory()
  const { user, setUser } = useContext(AuthContext)
  const handleLogout = () => {
    clearAuthToken()
    setUser(null)
    toast.warn('Logout success !', { autoClose: 3000 })
    history.push('/')
  }

  return (
    <HeaderContainer>
      {isModalOpen && <FormModal handleToggle={toggleModal} />}
      <NavbarList>
        <Nav exact to="/">Home</Nav>
        {user && <Nav to="/new_post">Post</Nav>}
        {user && <Nav to="/console">Console</Nav>}
        <Nav to="/about">About</Nav>
      </NavbarList>
      <div>
        {user?.username && <Span>{'Hi ' + user.username}</Span>}
        {user ? <UserBtn onClick={handleLogout}>log out</UserBtn> : <UserBtn onClick={toggleModal}>login</UserBtn>}
      </div>
    </HeaderContainer >
  )
}

export default Header
