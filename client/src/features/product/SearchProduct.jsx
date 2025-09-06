import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { searchProduct } from '../../services/product'
import ProductCard from '../../components/ProductCard'

function SearchProduct() {
    const [searchParam, setSearchParam] = useSearchParams()
    const search = searchParam.get('search')
    const [productList, setProductList] = useState([])

    async function fetchProductHandler() {
        try {
            const response = await searchProduct(search, 1, 20)
            setProductList(response.product);

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if (search) {
            fetchProductHandler()
        }
    }, [search])
    return (
        <>
            <div className='p-5'>
                <h1 className='font-semibold text-lg'>{search}</h1>
                {
                    productList.length > 0 ?
                    <div className='flex gap-4 mt-5'>
                        {
                            productList.map((item) => {
                                return (
                                    <ProductCard product={item}></ProductCard>
                                )
                            })
                        }
                    </div>:
                    <div>
                        <h1>No Product found</h1>
                    </div>
                }

            </div>
        </>
    )
}

export default SearchProduct