import { useState, useLayoutEffect } from 'react'

import styled from '@emotion/styled'
import { HashRouter as Router } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import RouteSwitch from './components/RouteSwitch'
import Header from './components/Header'
import Footer from './components/Footer'
import { AuthContext } from './context'
import { getUsers, getMe } from './WebAPI'
import { getAuthToken } from './utils'


const Layout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
  padding: 0 30px;
  max-width: 960px;
`

const Container = styled.div`
  text-align: center;
  width: 100%;
  /* height: calc(100vh - 204px); */
  height: calc(100vh - 48px - 53px - .5rem);
  overflow: overlay;
  margin: 24px 0 0;
  padding: 0 1rem;
  /* padding: 24px 0 0; */
`


const App = () => {
  const [user, setUser] = useState(null)
  const [userList, setUserList] = useState([])
  const [postData, setPostData] = useState([])
  const token = getAuthToken()

  useLayoutEffect(() => {
    getMe().then((res) => {
      if (res.ok !== 1) return
      setUser(res.data)
    })
  }, [token])

  useLayoutEffect(() => {
    getUsers().then((res) => {
      // if (res.ok !== 1) return
      setUserList(res)
    })
  }, [])


  return (
    <AuthContext.Provider value={{ user, setUser, userList, setUserList, postData, setPostData }}>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnVisibilityChange
        draggable
        pauseOnHover
      />
      <Layout>
        <Router>
          <Header />
          <Container>
            <RouteSwitch />
          </Container>
          <Footer />
        </Router>
      </Layout>
    </AuthContext.Provider>
  )
}

export default App
