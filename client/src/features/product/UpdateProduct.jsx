import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { fetchParticularProduct, updateProduct } from '../../services/product'
import ProductForm from '../../components/ProductForm'
import { productValidation } from '../../utils/productValidation'
import { useUser } from '../../contexts/UserContextProvider'
import toast from 'react-hot-toast'

function UpdateProduct() {
    const { id } = useParams()
    const [product, setProduct] = useState()
    const [errorMsg, setErrorMsg] = useState()
    const {token}=useUser()
    const navigate=useNavigate()
    async function fetchProductHandler() {
        try {
            const response = await fetchParticularProduct(id)
            setProduct(response.product);
            console.log(response.product);

        } catch (error) {
            console.log(error);
        }
    }

    function isValid(productForm, file, category, subCategory) {
        const error = productValidation(productForm, file, category, subCategory,true)
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
            if (file) {
                formData.append("prodImage", file)
            }

            try {
                const response=await updateProduct(id,formData,token)
                if(response){
                    toast.success("Product Updated Successfully")
                    navigate('/admin/products')
                }
            } catch (error) {
                console.log(error);
            }
        }
    }

    useEffect(() => {
        fetchProductHandler()
    }, [])
    return (
        <>
            <ProductForm previousProduct={product} mode='update' onSubmit={submitHandler} errorMsg={errorMsg} ></ProductForm>
        </>
    )
}

export default UpdateProduct