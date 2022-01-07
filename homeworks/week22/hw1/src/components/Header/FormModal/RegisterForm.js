import { useContext } from 'react'

import decode from 'jwt-decode'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { toast } from 'react-toastify'

import { AuthContext } from '../../../context'
import { setAuthToken } from '../../../utils'
import { singUp } from '../../../WebAPI'
import {
  H2,
  Form,
  InputField,
  InputLabel,
  Input,
  CheckboxField,
  CheckboxLabel,
  Checkbox,
  ErrorMsg,
  SubmitBtn,
  Note
} from '../../../styles/FormStyle'


const schema = yup.object({
  nickname: yup.string().min(2).max(8).matches(/^[A-Za-z]{1}[A-Za-z0-9]+$/, 'Must be word or number').required(),
  username: yup.string().min(4).max(8).matches(/^[A-Za-z]{1}[A-Za-z0-9]+$/, 'Must be word or number').required(),
  password: yup.string().min(6).max(12).required(),
  confirmPassword: yup.string().min(6).max(12).oneOf([yup.ref('password'), null], 'Passwords must be match').required(),
  checkRules: yup.boolean().oneOf([true], '(must be required)'),
}).required()

const LoginForm = ({ toggleModal, switchForm }) => {
  const { setUser } = useContext(AuthContext)
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  })

  const onSubmit = async ({ nickname, username, password }) => {
    toast.promise(
      singUp(nickname, username, password),
      {
        pending: 'Loading...',
        success: {
          render({ data }) {
            if (data?.ok !== 1) return data?.message
            const { token } = data
            setAuthToken(token)
            setUser(decode(token))
            toggleModal()
            return `Hi, ${username} welcome` || 'Register success 👌'
          }
        },
        error: {
          render({ data }) {
            reset()
            return data?.message || 'Register rejected 🤯'
          }
        }
      }, { autoClose: 3000 }
    )
  }

  return (
    <>
      <H2>Create an account</H2>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <InputField>
          <Input
            type="text"
            placeholder="..."
            $danger={errors.nickname}
            {...register("nickname")}
          />
          <InputLabel>Nickname</InputLabel>
          {errors.nickname && <ErrorMsg>{errors.nickname.message}</ErrorMsg>}
        </InputField>
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
        <InputField>
          <Input
            type="password"
            placeholder="..."
            $danger={errors.confirmPassword}
            {...register("confirmPassword")}
          />
          <InputLabel>Confirm Password</InputLabel>
          {errors.confirmPassword && <ErrorMsg>{errors.confirmPassword.message}</ErrorMsg>}
        </InputField>
        <CheckboxField>
          <CheckboxLabel $danger={errors.checkRules}>
            <Checkbox
              type="checkbox"
              $danger={errors.checkRules}
              {...register("checkRules")}
            />
            By creating account, you agree to accept our Privacy Policy, Terms
            of Service and Notification settings. {errors.checkRules && errors.checkRules.message}
          </CheckboxLabel>
        </CheckboxField>
        <SubmitBtn>Sing Up</SubmitBtn>
      </Form>
      <Note>
        <p>Already have an account?</p>
        <button onClick={switchForm} >Log in</button>
      </Note>
    </>
  )
}

export default LoginForm
