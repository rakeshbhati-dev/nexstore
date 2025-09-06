import React, { useEffect, useState } from 'react'
import { addCategory, deleteCategory, fetchCategories, updateCategory } from '../../services/categories';
import CategoryCard from '../../components/CategoryCard';
import Button from '../../components/Button';
import Input from '../../components/Input';
import { useUser } from '../../contexts/UserContextProvider';
import { textValidation } from '../../utils/textValidation';
import { useNavigate } from 'react-router-dom';

function Categories() {
  const [categoryList, setCategoryList] = useState([])
  const [mode, setMode] = useState(null)
  const [categoryTitle, setCategoryTitle] = useState('')
  const { token } = useUser()
  const [errorMsg, setErrorMsg] = useState('')
  const [categoryId, setCategoryId] = useState()
  const navigate=useNavigate()

  async function fetchAllCategoryHandler() {
    try {
      const response = await fetchCategories()
      setCategoryList(response.catg);
    } catch (error) {
      console.log(error);
    }
  }

  function isValid() {
    let errorMsg = textValidation(categoryTitle, 'category', '', 3)
    if (errorMsg) {
      setErrorMsg(errorMsg)
      return false
    }
    else {
      setErrorMsg('')
      return true
    }
  }

  function updateHandler(catg) {
    setCategoryId(catg._id)
    setCategoryTitle(catg.title)
    setMode('update')
  }

  async function submitHandler() {
    if (isValid()) {
      if (mode == 'add') {
        try {
          const response = await addCategory(token, categoryTitle)
          if (response) {
            setCategoryList((prev) => ([...prev, response.catg]))
            setCategoryTitle('')
            setMode(null)
          }
        } catch (error) {
          console.log(error);
        }
      }
      else {
        try {
          const response = await updateCategory(categoryId, categoryTitle, token)
          if (response) {
            const updateCatg = response.catg
            setCategoryList((prev) =>
              prev.map((cat) =>
                cat._id === updateCatg._id ? updateCatg : cat
              )
            );
            setMode(null)
            setCategoryTitle('')
          }
        } catch (error) {
          console.log(error);

        }
      }
    }
  }

  async function deleteHandler(id) {
    const filterCategory=categoryList.filter((catg) => catg._id.toString() !== id.toString())
    try {
      const response=await deleteCategory(id,token)
      if(response){
        setCategoryList(filterCategory)
      }
    } catch (error) {
      console.log(error);
    }
  }

  function handleNavigation(id){
    navigate(`/admin/subcategories/?id=${id}`)
  }
  useEffect(() => {
    fetchAllCategoryHandler()
  }, [])
  return (
    <div className='p-3 w-full mb-20'>
      <header className='flex justify-between items-center font-semibold'>
        <h1>Categories</h1>
        {/* <Link to='/admin/subcategories'><h1 className='text-violet-700 md:hidden'>Sub Categories <i className="fa-solid fa-angle-right"></i> </h1></Link> */}
      </header>
      <div className='mt-4 w-[30%] md:w-[15%]'>
        <Button value='Add Category' buttonStyle={`${mode ? 'hidden' : ''} text-xs md:text-sm`} onClick={() => setMode('add')}></Button>
      </div>
      <div className={`md:w-1/2 ${mode ? 'block' : 'hidden'} flex`}>
        <Input name='title' value={categoryTitle} placeholder='Enter Category' onChange={(e) => setCategoryTitle(e.target.value)} inputStyle='text-xs' errorMsg={errorMsg}></Input>
        <div className='inline-block w-20'>
          <Button value={`${mode == 'add' ? 'add' : 'update'}`} buttonStyle='text-xs' onClick={submitHandler}></Button>
        </div>
      </div>
      {
        categoryList.length > 0 &&
        <div className='flex flex-wrap mt-3 items-start'>
          {
            categoryList.map((category) => {
              return (
                <CategoryCard onNavigate={handleNavigation} category={category} onEdit={updateHandler} onDelete={deleteHandler}></CategoryCard>
              )
            })
          }
        </div>
      }
    </div>
  )
}

export default Categories