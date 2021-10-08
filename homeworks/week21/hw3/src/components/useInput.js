import { useState, useMemo, useCallback } from 'react'

const useInput = (initialValue = '') => {
  const [value, setValue] = useState(initialValue)
  const isEmpty = useMemo(() => !value.trim(), [value])
  const handleChange = useCallback((e) => setValue(e.currentTarget.value), [])
  const handleEscKey = useCallback((e) => e.key === 'Escape' && setValue(''), [])

  return { value, setValue, isEmpty, handleChange, handleEscKey }
}

export default useInput
