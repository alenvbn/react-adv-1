import { createContext } from 'react'

import { useProduct } from '../hooks/useProduct'
import {
  InitialValues,
  onChangeArgs,
  Product,
  ProductCardHandlers,
  ProductContextProps,
} from '../interfaces/interfaces'

import styles from '../styles/styles.module.css'

export const ProductContext = createContext({} as ProductContextProps)
const { Provider } = ProductContext

export interface Props {
  product: Product
  // children?: React.ReactElement | React.ReactElement[]
  className?: string
  style?: React.CSSProperties
  value?: number
  initialValues?: InitialValues
  children: (args: ProductCardHandlers) => JSX.Element
  onChange?: (args: onChangeArgs) => void
}

export const ProductCard = ({
  product,
  className,
  style,
  value,
  initialValues,
  onChange,
  children,
}: Props) => {
  const { counter, maxCount, isMaxCountReached, increaseBy, reset } =
    useProduct({
      product,
      value,
      initialValues,
      onChange,
    })

  return (
    <Provider
      value={{
        counter,
        product,
        maxCount,
        increaseBy,
      }}
    >
      <div className={`${styles.productCard} ${className}`} style={style}>
        {children({
          count: counter,
          isMaxCountReached,
          maxCount,
          product,
          increaseBy,
          reset,
        })}
      </div>
    </Provider>
  )
}
