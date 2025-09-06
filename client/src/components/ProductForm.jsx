import { CameraIcon, ChevronLeftIcon } from '@heroicons/react/16/solid'
import React, { useEffect, useState } from 'react'
import Input from './Input'
import { fetchCategories } from '../services/categories'
import Dropdown from './Dropdown'
import { fetchSubCategories } from '../services/subCategories'
import Button from './Button'

function ProductForm({ onSubmit,errorMsg,previousProduct,mode='add' }) {
  const [file, setFile] = useState()
  const [fileImage, setFileImage] = useState()
  const [product, setProduct] = useState({
    prodName: '',
    prodStock: '',
    price: '',
    description: '',
    subCategory: '',
    prodImage: ''
  })

  const [categoryList,setCategoryList]=useState([])
  const [subCategoryList,setSubCategoryList]=useState([])
  const [selectedCategory,setSelectedCategory]=useState({})
  const [selectedSubCategory,setSelectedSubCategory]=useState()
  const imageUrl=import.meta.env.VITE_IMAGE_API

  function inputHandler(e) {
    const { value, name } = e.target
    setProduct((prev) => ({ ...prev, [name]: value }))
  }

  function fileHandler(e) {
    const fileUrl = e.target.files[0]
    setFile(fileUrl)
    if (fileUrl) {
      const imgUrl = URL.createObjectURL(fileUrl)
      setFileImage(imgUrl)
    }
  }

  async function fetchCategoryHandler(){
    try {
      const response=await fetchCategories()
      setCategoryList(response.catg)
    } catch (error) {
      console.log(error);
    }
  }

  function categoryHandler(catg){
    setSelectedCategory(catg)
  }

  function subCategoryHandler(subCatg){
    setSelectedSubCategory(subCatg)
  }

  async function fetchSubCategoryHandler() {
    try {
      if(Object.keys(selectedCategory).length>0){
        const response=await fetchSubCategories(selectedCategory._id)
        setSubCategoryList(response.subcategories)
      }
    } catch (error) {
      console.log(error);
      
    }
  }

  useEffect(()=>{
    fetchCategoryHandler()
  },[])

  useEffect(()=>{
    if(mode==='update' && previousProduct){
      setProduct(previousProduct)
      setFileImage(`${imageUrl}/product/${previousProduct.prodImage}`)
      setSelectedSubCategory(previousProduct.subCategory)
      setSelectedCategory(previousProduct.subCategory.category)
    }
  },[mode,previousProduct])

  useEffect(()=>{
    fetchSubCategoryHandler()
  },[selectedCategory])

  return (
    <div className='w-full p-3 pb-20 md:w-1/2 p'>
      <header className='flex justify-between items-center font-semibold md:hidden'>
        <h1><ChevronLeftIcon className='inline-block w-5 h-5' />All Products</h1>
        <button className='text-violet-700' onClick={()=>onSubmit(product,file,selectedCategory,selectedSubCategory)}>Save</button>
      </header>

      <div className='mt-5 border-1 border-stone-200 p-3 '>
        <h1 className='mb-3 font-semibold'>Product Image</h1>
        <div>
          {
            fileImage && <img src={fileImage} alt="" className='w-30 h-30 border border-stone-100 p-5 mx-auto' />
          }
          <label htmlFor="prodFile" className='border-1 border-stone-200 h-20 block w-full flex flex-col justify-center items-center rounded-lg'>
            <input type="file" className="file-input file-input-ghost hidden" id='prodFile' onChange={fileHandler} />
            <CameraIcon className='w-5 h-5 md:w-10 h-10 text-stone-300'></CameraIcon>
            <h1 className='text-xs text-violet-400'>Upload File</h1>
          </label>
          {errorMsg && <p className='text-sm text-red-500 font-semibold'>{errorMsg.file}</p>}
        </div>
      </div>
      <div className='mt-5 border-1 border-stone-200 p-3 w-full'>
        <h1 className='mb-3 font-semibold'>Product Information</h1>
        <Input id='prodName' name='prodName' placeholder='Samsung Galaxy M35' label='Product Name' labelStyle='text-stone-700 text-sm' onChange={inputHandler} value={product.prodName} inputStyle='text-xs md:text-sm' errorMsg={errorMsg?.prodName}></Input>
        <label htmlFor="prodDesc" className='text-sm text-stone-700'>Description</label>
        <textarea name="description" id="prodDesc" className='border-1 border-stone-400 block w-full h-20 focus:border-primary focus:outline-none p-1 text-xs md:w-full' onChange={inputHandler} value={product.description} />
        {errorMsg && <p className='text-sm text-red-500 font-semibold'>{errorMsg.desc}</p>}
      </div>

      <div className='mt-5 border-1 border-stone-200 p-3'>
        <h1 className='mb-3 font-semibold'>Price & Stock</h1>
        <div className='md:flex'>
          <Input id='prodPrice' name='price' placeholder='30,000' label='Price' labelStyle='text-stone-700 text-sm'
            onChange={inputHandler} value={product.price} errorMsg={errorMsg?.price}></Input>
          <Input id='prodStock' name='prodStock' placeholder='500' label='Stocks' labelStyle='text-stone-700 text-sm'
            onChange={inputHandler} value={product.prodStock} errorMsg={errorMsg?.stock}></Input>
        </div>
      </div>

      <div className='mt-5 border-1 border-stone-200 p-3 w-full mb-10'>
        <h1 className='mb-3 font-semibold'>Category</h1>
        <div>
          {
            categoryList.length>0 && 
           <>
           {errorMsg && <p className='text-sm text-red-500 font-semibold'>{errorMsg.category}</p>}
            <Dropdown value={selectedCategory?.title || "Select a Category"} options={categoryList} optionsHandler={categoryHandler} divStyle='border w-full md:w-[45%] border-stone-300 py-2 pl-3 mr-3 mb-3' optionsStyle='w-full'></Dropdown>
           </>
          }
          {
            subCategoryList.length>0 &&
            <>
            {errorMsg && <p className='text-sm text-red-500 font-semibold'>{errorMsg.subCategory}</p>}
            <Dropdown value={selectedSubCategory?.title || "Select Sub Category"} options={subCategoryList} optionsHandler={subCategoryHandler} divStyle='border w-full md:w-[45%] border-stone-300 py-2 pl-3' optionsStyle='w-full'></Dropdown>
            </>
          }
        </div>
        
      </div>
      <div className='hidden md:block w-1/2'>
         <Button value={`${mode==='add'?'Add':'Update'}`} onClick={()=>onSubmit(product,file,selectedCategory,selectedSubCategory)}></Button>
      </div>
    </div>
  )
}

export default ProductForm