import React, { useEffect, useState } from 'react'
import { useUser } from '../../contexts/UserContextProvider'
import Input from '../../components/Input'
import Button from '../../components/Button'
import { textValidation } from '../../utils/textValidation'
import { useOrder } from '../../contexts/OrderContextProvider'

function Address({onNext}) {
    const { user } = useUser()
    const {setAddress}=useOrder()
    const [formData, setFormData] = useState({
        name: '',
        mobile: '',
        addressLine: '',
        city: '',
        state: '',
        landmark: '',
        pincode: ''
    })
    const [errorMessages, setErrorMessages] = useState({})

    function inputHandler(e) {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    function isValidate() {
        let err = {}
        if (textValidation(formData.addressLine, "Address", '', 10)) {
            err.addError = textValidation(formData.addressLine, "Address", '', 10)
        }
        if (textValidation(formData.city, "City", '', 3)) {
            err.cityError = textValidation(formData.city, "City", '', 3)
        }
        if (textValidation(formData.state, "State", '', 3)) {
            err.stateError = textValidation(formData.state, "State", '', 3)
        }
        if (textValidation(formData.landmark, "Landmark", '', 10)) {
            err.landError = textValidation(formData.landmark, "Landmark", '', 10)
        }
        if (textValidation(formData.pincode, "Pincode", '', 6)) {
            err.pinError = textValidation(formData.pincode, "Pincode", '', 6)
        }
        setErrorMessages(err)
        if (Object.keys(err).length > 0) {
            setErrorMessages(err)
            return false
        }
        else {
            return true
        }
    }



    function submitHandler() {
        if (isValidate()) {
            setAddress(formData)
            onNext()
        }
    }

    useEffect(() => {
        if (user) {
            setFormData(prev => ({
                ...prev,
                name: user.username || '',
                mobile: user.mobile || ''
            }));
        }
    }, [user]);

    if (user === null) {
        return <span className="loading loading-spinner loading-xs"></span>
    }

    return (
        <div className='px-5 py-3 md:w-[30%] md:mx-auto border-1 border-base-300 mt-5'>
            <h1 className='font-semibold mb-2'>Delivery Address</h1>
            <Input id='uname' name='name' label='Username' value={formData.name} labelStyle='text-sm' readOnly={true} onChange={inputHandler} />
            <Input id='mob' name='mobile' label='Mobile No' value={formData.mobile} labelStyle='text-sm' onChange={inputHandler} readOnly={true} />
            <Input id='add' name='addressLine' label='Address Line' value={formData.addressLine} labelStyle='text-sm' onChange={inputHandler} errorMsg={errorMessages.addError} />
            <Input id='ct' name='city' label='City' value={formData.city} labelStyle='text-sm' onChange={inputHandler} errorMsg={errorMessages.cityError} />
            <Input id='st' name='state' label='State' value={formData.state} labelStyle='text-sm' onChange={inputHandler} errorMsg={errorMessages.stateError} />
            <Input id='lm' name='landmark' label='Landmark' value={formData.landmark} labelStyle='text-sm' onChange={inputHandler} errorMsg={errorMessages.landError} />
            <Input id='pcode' name='pincode' label='Pincode' value={formData.pincode} labelStyle='text-sm' onChange={inputHandler} errorMsg={errorMessages.pinError} />
            <Button value='Continue' onClick={submitHandler} />
        </div>
    )
}

export default Address