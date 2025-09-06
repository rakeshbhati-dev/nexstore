import React from 'react'
import ProductDetail from './ProductDetail'
import { useParams } from 'react-router-dom'

function AdminProduct() {
  const { id } = useParams()
  return (
    <>
    <ProductDetail isAdmin={true} productId={id}></ProductDetail>
    </>
  )
}

export default AdminProduct