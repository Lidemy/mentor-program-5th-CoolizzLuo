import { useState } from 'react'
import styled from '@emotion/styled'

import { useHistory } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from "yup"
import { toast } from 'react-toastify'
import MDEditor from '@uiw/react-md-editor'

import { addPost } from '../../WebAPI'


const Wrapper = styled.div`
  margin: 2rem auto 0;
  padding: 1rem;
  max-width: 760px;
  background: #fff;
  border-radius: 6px;
  box-shadow: 0 1px 2px rgb(0 0 0 / 10%);
`

const H2 = styled.h2`
  text-align: center;
`

const Form = styled.form`
  margin: 1rem 0 0;
`

const Label = styled.label`
  text-align: left;
  display: block;
`


const Input = styled.input`
  min-width: 100%;
  max-width: 100%;
  padding: .6rem;
  margin: .8rem 0 1rem;
  font-size: 1rem;
  background: #fff;
  border: 1px solid #dfdfe0;
  border-radius: 3px;
  outline: none;
`

const PostEditor = styled.div`
  margin: .8rem 0 1rem;
`

const SubmitBtn = styled.button`
  font-size: .9rem;
  padding: .3rem 1rem;
  width: 100%;
  margin-top: .5rem;
  /* background-color: #a29bfe; */
  background-color: #428bca;
  border-color: transparent;
  border-radius: 4px;
  box-shadow: 2px 2px 2px #666;
  color: #fff;
  cursor: pointer;
  transition: all .3s;

  &:active {
    transform: translate(2px, 2px);
    box-shadow: none;
  }
  &:hover {
    transform: scale(1.05);
  }
`

const schema = yup.object({
  title: yup.string().required(),
}).required()


const NewPostPage = () => {
  const [body, setBody] = useState('')
  const history = useHistory()
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  })

  const onSubmit = async (data) => {
    const { title } = data

    toast.promise(
      addPost(title, body),
      {
        pending: 'Loading...',
        success: {
          render({ data }) {
            if (!data?.id) return data?.message
            history.push('/')
            return 'Post Successful !'
          }
        },
        error: {
          render({ data }) {
            history.push('/')
            return data?.message || 'Post Fail !'
          }
        }
      }, { autoClose: 3000 }
    )
  }

  return (
    <Wrapper>
      <H2>New Post</H2>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Label>
          Title:
          <Input
            type="text"
            placeholder="Please input title..."
            $danger={errors.title}
            {...register("title")}
          />
        </Label>
        <Label>Content:</Label>
        <PostEditor>
          <MDEditor
            value={body}
            onChange={setBody}
            autoFocus
            toolbarHeight="50px"
            preview="edit"
          />
        </PostEditor>
        <SubmitBtn>Submit</SubmitBtn>
      </Form>
    </Wrapper>
  )
}

export default NewPostPage
