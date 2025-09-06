import React from 'react'
import { Link } from 'react-router-dom'

function Dropdown({ value, options = [], valueStyle, optionsStyle,divStyle, onClick, optionsHandler }) {

  return (
    <div className={`dropdown dropdown-center ${divStyle}`} onClick={onClick}>
      <div tabIndex={0} className={`${valueStyle} cursor-pointer`} >{value}</div>
      {
        options.length > 0 &&
        <ul tabIndex={0} className={`dropdown-content menu bg-base-100 rounded-box z-1 w-40 p-2 border-1 border-stone-300 ${optionsStyle}`}>
          {
            options.map((obj) => {
              return (
                <li className='px-3 py-2 hover:text-violet-700 cursor-pointer' key={obj._id} onClick={() => optionsHandler(obj)} >{obj.title}</li>
              )
            })
          }
        </ul>
      }
    </div>
  )
}

export default Dropdown