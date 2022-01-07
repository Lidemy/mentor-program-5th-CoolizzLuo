import { useContext } from 'react'

import decode from 'jwt-decode'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from "yup"
import { toast } from 'react-toastify'

import { AuthContext } from '../../../context'
import { setAuthToken } from '../../../utils'
import { login } from '../../../WebAPI'
import {
  H2,
  Form,
  InputField,
  InputLabel,
  Input,
  ErrorMsg,
  SubmitBtn,
  Note
} from '../../../styles/FormStyle'


const schema = yup.object({
  username: yup.string().required(),
  password: yup.string().min(6).max(18).required(),
}).required()

const LoginForm = ({ toggleModal, switchForm }) => {
  const { setUser } = useContext(AuthContext)
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  })

  const onSubmit = async ({ username, password }) => {
    toast.promise(
      login(username, password),
      {
        pending: 'Loading...',
        success: {
          render({ data }) {
            if (data?.ok !== 1) return data?.message
            const { token } = data
            setAuthToken(token)
            setUser(decode(token))
            toggleModal()
            return `Hi, ${username} welcome` || 'Login success  👌'
          }
        },
        error: {
          render({ data }) {
            reset()
            return data?.message || 'Login rejected 🤯'
          }
        }
      }, { autoClose: 3000 }
    )
  }

  return (
    <>
      <H2>Log into Blog</H2>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <InputField>
          <Input
            type="text"
            placeholder="..."
            $danger={errors.username}
            {...register("username")}
          />
          <InputLabel>Username</InputLabel>
          {errors.username && <ErrorMsg>{errors.username.message}</ErrorMsg>}
        </InputField>
        <InputField>
          <Input
            type="password"
            placeholder="..."
            $danger={errors.password}
            {...register("password")}
          />
          <InputLabel>Password</InputLabel>
          {errors.password && <ErrorMsg>{errors.password.message}</ErrorMsg>}
        </InputField>
        <SubmitBtn>Log In</SubmitBtn>
      </Form>
      <Note>
        <p>Don't have an account?</p>
        <button onClick={switchForm} >Sign up</button>
      </Note>
    </>
  )
}

export default LoginForm
