/**
 * @param radioData give useInput
 * @param radioOptions {option: 'radio-name', value: 'value'}
 * @param name input-name
 * @param labelName this radio title
 * @param errMsg If need error message, outside div need className: required
 */

const Radio = ({radioData, radioOptions, name, labelName, errMsg = `請選擇${labelName}`}) => {
  return (
    <>
      <p>{labelName}</p>
      { radioOptions.map((radio) => (
          <label key={radio.value}>
            <input 
              type="radio" 
              name={name} 
              value={radio.value} 
              onChange={() => radioData.setValue(radio.value)}/>
              &ensp; {radio.option}
          </label>
        )) }
      <p className={`${radioData.isEmpty ? 'input-error' : 'hidden'}`}>{errMsg}</p>
    </>
  )
}

export default Radio