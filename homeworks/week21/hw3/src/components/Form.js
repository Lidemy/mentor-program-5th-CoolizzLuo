import { useMemo, useCallback } from 'react'
import useInput from './useInput'
import Input from './Input'
import Radio from './Radio'
import styled from 'styled-components';

const FormWrapper = styled.form`
  .input-block {
    display: flex;
    flex-direction: column;
    align-items: start;
    justify-content: space-between;
    font-size: 1.2rem;
    margin-top: 1rem;
    
    & > label + input {
      margin-top: 1rem;
    }  
    & p ~ label {
      font-size: .8rem;
      margin-top: 1rem;
    }
    & > input {
      padding: 3px 6px;
      width: 50%;
      transition: width .5s;
    }
    & > label > .sub-title {
      font-size: .9rem;
      margin-top: .6rem;
    }
  }

  .input-error {
    visibility: hidden;
  }

  .required > :first-child::after {
    content: '*';
    color: red;
    font-size: 1.4rem;
    margin-left: 5px;
  }

  &.verify > .required {
    .input-error {
      visibility: visible;
      font-size: 0.85rem;
      margin-top: 5px;
      color: #fe1605;
    }
    & input:not([type="radio"]).highlight {
      border-color: transparent;
      outline: 2px solid red;
    }
    & input[type="radio"].highlight {
      color: red;
    }
  }

  .hidden {
    visibility: hidden;
  }

  .danger {
    color: #fe1605;
    margin-top: 1rem,;
  }

  .submit {
    padding: 13px 32px;
    margin: 40px 0 20px;
    font-weight: 700;
    background: #fad312;
    box-shadow: 2px 2px 5px #999;
    border-radius: 3px;
    outline: none;
    border: none;
    cursor: pointer;
    &:active {
      transform: translate(2px, 2px);
    }
    &:hover {
      transform: scale(1.05);
    }
  }
`

const Form = () => {
  const username = useInput()
  const email = useInput()
  const phone = useInput()
  const reason = useInput()
  const other = useInput()
  const signUpType = useInput()
  const signUpOptions = [
    { option: '躺在床上用想像力實作', value: '1' },
    { option: '趴在地上滑手機找現成的', value: '2' },
  ]

  const haveEmptyData = useMemo(() => (
    username.isEmpty || email.isEmpty || phone.isEmpty || reason.isEmpty || signUpType.isEmpty 
  ), [username, email, phone, reason, signUpType])

  const verifyFrom = useCallback((e) => {
    e.preventDefault()
    if(haveEmptyData) {
      if (!e.target.classList.contains('verify')) e.target.classList.add('verify')
      return alert('請輸入完整表單資料')
    } 

    alert('表單驗證通過，點擊後送出!')
    e.target.submit()
  }, [haveEmptyData])

  return (
    <FormWrapper action="" onSubmit={verifyFrom}>
      <div className="input-block required">
        <Input inputData={username} id={'username'} type={'text'} labelName={'暱稱'}/>
      </div>
      <div className="input-block required">
        <Input inputData={email} id={'email'} type={'email'} labelName={'電子郵件'}/>
      </div>
      <div className="input-block required">
        <Input inputData={phone} id={'phone'} type={'phone'} labelName={'手機號碼'}/>
      </div>
      <div className="input-block required">
        <Radio
          radioData={signUpType}
          radioOptions={signUpOptions}
          name="sign-up"
          labelName={'報名類型'}
          errMsg={'請選擇報名類型'}
        />
      </div>
      <div className="input-block required">
        <Input 
          inputData={reason} 
          id={'reason'} 
          type={'text'} 
          labelName={'怎麼知道這個活動的？'}
          placeholder={'您的回答'}
          errMsg={'請填寫活動內容'}
        />
      </div>
      <div className="input-block">
        <Input 
          inputData={other} 
          id={'other'}
          type={'text'} 
          labelName={'其他'}
          subTitle={'對活動的一些建議'}
          placeholder={'您的回答'}
        />
      </div>
      <input type="submit" className="submit" value="提交"/>
      <p className="danger">請勿透過表單送出您的密碼。</p>
    </FormWrapper>
  )

}

export default Form