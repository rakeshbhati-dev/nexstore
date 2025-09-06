import React from 'react'

function Button({value='',buttonStyle,onClick}) {
  return (
    <button className={`${buttonStyle} bg-primary w-full py-2 cursor-pointer text-white`} onClick={onClick}>{value}</button>
  )
}

export default Button