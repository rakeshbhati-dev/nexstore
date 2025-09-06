import React from 'react'

function Input({ label, labelStyle = '',divStyle, type = 'text', name , value, id = '', errorMsg, inputStyle = '', placeholder = '', onChange,readOnly=false }) {
    return (
        <div className={`w-full ${divStyle} mb-3`}>
            {label &&  <label htmlFor={id} className={`${labelStyle} block text-stone-500`}>{label}</label> }
            <input type={type} 
            name={name} 
            value={value} 
            id={id} 
            placeholder={placeholder} 
            onChange={onChange}
            readOnly={readOnly} 
            className={`${inputStyle} border-1 border-stone-300 w-full px-2 py-2 focus:outline-none focus:border-violet-500 rounded`} />
            {errorMsg && <p className='text-sm text-red-500 font-semibold'>{errorMsg}</p>}
        </div>
    )
}

export default Input