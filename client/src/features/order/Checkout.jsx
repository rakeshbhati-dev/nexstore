import React, { useState } from 'react'
import Address from './Address'
import Review from './Review'
import { useCart } from '../../contexts/CartContextProvider'
import EmptyCart from '../../pages/EmptyCart'

function Checkout() {
  const [step, setStep] = useState(1)
  const { cartItem, loading } = useCart()

  if (loading) {
    return <span className="loading loading-spinner loading-xs"></span>
  }

  if (!cartItem || cartItem.length === 0) {
    return (
      <div>
        <EmptyCart></EmptyCart>
      </div>
    )
  }

  return (
    <div>
      {step === 1 && <Address onNext={() => setStep(2)} />}
      {step === 2 && <Review />}
    </div>
  )
}

export default Checkout
