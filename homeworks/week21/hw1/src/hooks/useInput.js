import { useState, useCallback } from 'react'

const useInput = (initialValue = '') => {
  const [value, setValue] = useState(initialValue)
  const handleChange = useCallback((e) => setValue(e.currentTarget.value), [])
  const handleEscKey = useCallback((e) => e.key === 'Escape' && setValue(''), [])

  return { value, setValue, handleChange, handleEscKey }
}

export default useInput