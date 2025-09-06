import { textValidation } from "./textValidation"

export function productValidation(productForm, file, category, subCategory,forUpdate=false) {
    const error = {}
    if (textValidation(productForm.prodName, 'Product Name', '', 3)) {
      error.prodName = textValidation(productForm.prodName, 'Product Name', '', 3)
    }
    if (textValidation(productForm.description, 'Description', '', 50)) {
      error.desc = textValidation(productForm.description, 'Description', '', 50)
    }
    if (textValidation(productForm.price, 'Price')) {
      error.price = textValidation(productForm.price, 'Price')
    }
    if (textValidation(productForm.prodStock, 'Stock')) {
      error.stock = textValidation(productForm.prodStock, 'Stock')
    }
    if (!file && !forUpdate) {
      error.file = "Upload product image"
    }

    if (!category || Object.keys(category).length===0) {
      error.category = "Select a category"
    }
    if (!subCategory || Object.keys(subCategory).length===0) {
      error.subCategory = "Select a sub category"
    }

    return error
  }