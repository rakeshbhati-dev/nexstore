import React, { useEffect, useState } from 'react'
import Dropdown from './Dropdown'
import { fetchCategories } from '../services/categories';
import { fetchSubCategories } from '../services/subCategories';
import CollapseNav from './CollapseNav';
import { Bars3Icon } from '@heroicons/react/16/solid';
import { XMarkIcon } from '@heroicons/react/16/solid';
import { useNavigate } from 'react-router-dom';

function CategoriesNav() {
  const [categories,setCategories]=useState([])
  const [subCategories,setSubCategories]=useState([])
  const [showNav,setShowNav]=useState(false)
  const navigate=useNavigate()
  async function fetchCategoryHandler(){
    try {
      const response=await fetchCategories()
      setCategories(response.catg);
      
    } catch (error) {
      console.log(error);
    }
  }

  async function fetchSubCategoriesHandler(id) {
    try {
      const response=await fetchSubCategories(id)
      setSubCategories(response.subcategories);
    } catch (error) {
      setSubCategories([]);
      console.log(error);
      
    }
  }

  function handleNavigation(subCatg){
    navigate(`/product/subcategory/${subCatg.title}`,{state:{subId:subCatg._id}})
  }

  useEffect(()=>{
    fetchCategoryHandler()
  },[])
  return (
    <>
    {
      categories.length>0 && 
      <div>
        {/* Desktop & Tablet Device */}
      <div className='py-2 px-4 flex n ml-3 hidden md:block'>
        {
          categories.map((category)=>{
            return(
              <Dropdown value={category.title} onClick={()=>fetchSubCategoriesHandler(category._id)} options={subCategories} key={category._id} valueStyle='mr-8 hover:text-violet-700' optionsHandler={handleNavigation}></Dropdown>
            )
          })
        }
      </div>
      {/* Mobile Device */}
      <div className='md:hidden'>
        {!showNav && <Bars3Icon className='w-5 h-5' onClick={()=>setShowNav((prev)=>!prev)}></Bars3Icon>}
        {
          showNav &&
          <div className='absolute w-full bg-white z-10'>
            <XMarkIcon className='w-7 h-7 float-right mr-4 my-2' onClick={()=>setShowNav((prev)=>!prev)}></XMarkIcon>
          {
          categories.map((category)=>{
            return(
              <CollapseNav value={category.title} onClick={()=>fetchSubCategoriesHandler(category._id)} options={subCategories} key={category._id} valueStyle='mr-8 hover:text-violet-700' onNavigate={handleNavigation}></CollapseNav>
            )
          })
        }
        </div>
        }
      </div>
    </div>
    }
    </>
  )
}

export default CategoriesNav