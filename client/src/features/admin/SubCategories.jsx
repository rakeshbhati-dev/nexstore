import React, { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { fetchCategories } from '../../services/categories'
import { addSubCategories, deleteSubCategories, fetchSubCategories } from '../../services/subCategories'
import { ChevronLeftIcon, XMarkIcon } from '@heroicons/react/24/outline'
import Button from '../../components/Button'
import Input from '../../components/Input'
import Dropdown from '../../components/Dropdown'
import { useUser } from '../../contexts/UserContextProvider'
import { textValidation } from '../../utils/textValidation'

function SubCategories() {
    const [categoryList, setCategoryList] = useState([])
    const [selectedCategory, setSelectedCategory] = useState()
    const [searchParams] = useSearchParams()
    const [categoryId, setCategoryId] = useState(searchParams.get('id') || null)
    const [subCategoryList, setSubCategoryList] = useState([])
    const [subCategoryTitle, setSubCategoryTitle] = useState('')
    const [canAdd, setCanAdd] = useState(false)
    const {token}=useUser()
    const [errorMsg,setErrorMsg]=useState()

    async function fetchCategoryHandler() {
        try {
            const response = await fetchCategories()
            setCategoryList(response.catg)
        } catch (error) {
            console.log(error);
        }
    }

    async function fetchSubCategoryHandler() {
        try {
            const response = await fetchSubCategories(categoryId)
            setSubCategoryList(response.subcategories)
        } catch (error) {
            console.log(error);
        }
    }

    function categoryHandler(catg){
        setCategoryId(catg._id)
        setSelectedCategory(catg)
    }

    function isValid(){
        let errorMessage=textValidation(subCategoryTitle,'sub category','',3)
        if(errorMessage){
            setErrorMsg(errorMessage)
            return false
        }
        else if(!categoryId){
            setErrorMsg("Select Category")
            return false
        }
        else{
            setErrorMsg('')
            return true
        }
    }

    async function submitHandler() {
        if(canAdd && isValid()){
            try {
                const response=await addSubCategories(categoryId,subCategoryTitle,token)
                if(response){
                    setSubCategoryList((prev)=>[...prev,response.subCategory])
                    setSubCategoryTitle('')
                    setCanAdd(false)
                }
            } catch (error) {
                console.log(error);
            }
        }
    }

    async function deleteHandler(subId) {
        const filterSubCatg=subCategoryList.filter((sub) => sub._id.toString() !== subId.toString())
        try {
            const response=await deleteSubCategories(subId,token)
            if(response){
                setSubCategoryList(filterSubCatg)
            }
        } catch (error) {
            console.log(error);
            
        }
    }

    useEffect(()=>{
        fetchCategoryHandler()
    },[])

    useEffect(()=>{
        if(categoryId){
            fetchSubCategoryHandler()
        }
    },[categoryId])

    return (
        <div className='p-3 w-full mb-20'>
            <header className='font-semibold md:hidden flex items-center justify-between'>
                <Link to='/admin/categories'> <h1><ChevronLeftIcon className='w-5 h-5 inline-block' /> Categories</h1></Link>
                <button className='text-violet-600 bg-stone-200 px-5 py-1 rounded-lg' onClick={() => setCanAdd(true)}>Add</button>
            </header>
            <div className='hidden md:block w-[15%]'>
                <Button value='Add Sub Category' onClick={()=>setCanAdd(true)} buttonStyle={`${canAdd?'hidden':'block'}`}></Button>
            </div>
            {
                canAdd &&
                <div className='md:w-1/2 flex'>
                    <Input name='title' value={subCategoryTitle} placeholder='Enter Sub Category' onChange={(e)=>setSubCategoryTitle(e.target.value)} inputStyle='text-xs' errorMsg={errorMsg}></Input>
                    <div className='w-20'>
                        <Button value='Add' buttonStyle='text-xs' onClick={submitHandler}></Button>
                    </div>
                </div>
            }

            {
                categoryList.length>0 &&
                <div className='mt-3'>
                    <p>Filter By:</p>
                    <Dropdown value={selectedCategory?.title || 'Select Category'} options={categoryList} optionsHandler={categoryHandler} valueStyle='border border-stone-300 px-5 py-2  text-violet-400'></Dropdown>
                </div>
            }
            <div>
                {
                    subCategoryList.length>0 && 
                    <div className='flex flex-wrap items-start mt-3'>
                        {
                            subCategoryList.map((subCatg)=>{
                                return(
                                    <div className="bg-base-100 border-base-300 border w-1/2 md:w-1/4 lg:w-1/5 mb-3 text-xs flex items-center justify-between px-3 py-2">
                                        <h1 className='font-semibold md:text-sm'>{subCatg.title}</h1>
                                        <XMarkIcon className='w-5 h-5' onClick={()=>deleteHandler(subCatg._id)}/>
                                    </div>
                                )
                            })
                        }
                    </div>
                }
            </div>
        </div>
    )
}

export default SubCategories