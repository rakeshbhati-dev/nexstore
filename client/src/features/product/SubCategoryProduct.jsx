import React, { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import { fetchProductBySubCategory } from '../../services/product'
import ProductCard from '../../components/ProductCard'
import CategoriesNav from '../../components/CategoriesNav'

function SubCategoryProduct() {
    const location = useLocation()
    const {title}=useParams()
    const id = location.state.subId
    const [product,setProduct]=useState([])

    async function fetchProductHandler() {
        try {
            const response = await fetchProductBySubCategory(id)
            setProduct(response.product);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(()=>{
        fetchProductHandler()
    },[title,id])
    return (
        <>
        <CategoriesNav></CategoriesNav>
        <div className='p-5'>
            <h1 className='font-semibold text-lg'>{title}</h1>
                {
                    product.length>0 &&
                    <div className='flex gap-4 mt-5'>
                        {
                            product.map((item)=>{
                                return(
                                    <ProductCard product={item}></ProductCard>
                                )
                            })
                        }
                    </div>
                }
            
        </div>
        </>
    )
}

export default SubCategoryProduct