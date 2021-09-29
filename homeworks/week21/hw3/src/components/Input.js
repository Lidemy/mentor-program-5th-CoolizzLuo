/**
 * @param inputData give useInput
 * @param id for label and input element link
 * @param type input-type
 * @param labelName as param name
 * @param subTitle If need sub title, give param will be show under label
 * @param placeholder
 * @param errMsg If need error message, outside div need className: required
 */

const Input = ({inputData, id, type, labelName, subTitle, placeholder = `您的${labelName}`, errMsg = `請輸入${labelName}`}) => {
  return (
    <>
      <label htmlFor={id}>
        {labelName}
        {subTitle ? <p className="sub-title">{subTitle}</p> : ''}
      </label>
      <input type={type} id={id}
        className={`${inputData.isEmpty ? 'highlight' : ''}`}
        placeholder={placeholder} 
        value={inputData.value}
        onChange={inputData.handleChange}
      />
      <p className={`${inputData.isEmpty ? 'input-error' : 'hidden'}`}>{errMsg}</p>
    </>
  )
}

export default Input