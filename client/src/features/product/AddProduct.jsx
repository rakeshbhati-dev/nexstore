import React, { useState } from 'react'
import ProductForm from '../../components/ProductForm'
import { textValidation } from '../../utils/textValidation';
import { useUser } from '../../contexts/UserContextProvider';
import { addProduct } from '../../services/product';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { productValidation } from '../../utils/productValidation';

function AddProduct() {
  const [errorMsg, setErrorMsg] = useState()
  const {token}=useUser()
  const navigate=useNavigate()

  function isValid(productForm, file, category, subCategory) {
    const error = productValidation(productForm,file,category,subCategory)
    setErrorMsg(error)
    if (Object.keys(error).length > 0) {
      return false
    }
    else {
      return true
    }
  }
  async function submitHandler(productForm, file, category, subCategory) {
    if (isValid(productForm, file, category, subCategory)) {
      const formData = new FormData()
      formData.append("prodName", productForm.prodName)
      formData.append("prodStock", productForm.prodStock)
      formData.append("price", productForm.price)
      formData.append("description", productForm.description)
      formData.append("subCategory", subCategory._id)
      formData.append("prodImage",file)

      try {
        const response=await addProduct(token,formData)
        if(response){
          toast.success('Product Added Successfully')
          navigate('/admin/products')
        }
      } catch (error) {
        toast.error("Something went wrong, try again later")
        console.log(error);
      }
    }
  }
  return (
    <>
      <ProductForm onSubmit={submitHandler} errorMsg={errorMsg} />
    </>
  )
}

export default AddProduct