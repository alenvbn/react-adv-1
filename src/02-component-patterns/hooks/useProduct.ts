import { useEffect, useRef, useState } from 'react'
import { InitialValues, onChangeArgs, Product } from '../interfaces/interfaces'

export interface useProductArgs {
  product: Product
  value?: number
  initialValues?: InitialValues
  onChange?: (args: onChangeArgs) => void
}

export const useProduct = ({
  product,
  value = 0,
  initialValues,
  onChange,
}: useProductArgs) => {
  const [counter, setCounter] = useState<number>(initialValues?.count || value)

  const isMounted = useRef(false)

  const increaseBy = (value: number) => {
    let newValue: number = Math.max(counter + value, 0)

    if (initialValues?.maxCount) {
      newValue = Math.min(initialValues?.maxCount, newValue)
    }

    setCounter(newValue)
    onChange && onChange({ count: newValue, product })
  }

  const reset = () => {
    setCounter(initialValues?.count || value)
  }

  useEffect(() => {
    if (!isMounted.current) return
    setCounter(value)
  }, [value])

  useEffect(() => {
    isMounted.current = true
  }, [])

  return {
    counter,
    maxCount: initialValues?.maxCount,
    isMaxCountReached:
      !!initialValues?.maxCount && initialValues?.maxCount === counter,

    increaseBy,
    reset,
  }
}
