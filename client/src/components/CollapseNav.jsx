import React from 'react'
import { Link } from 'react-router-dom'

function CollapseNav({ value, options = [], valueStyle, optionsStyle, onClick,onNavigate }) {
    return (
        <div tabIndex={0} className="collapse collapse-arrow bg-base-100 border-base-300 border">
            <div className="collapse-title font-semibold" onClick={onClick}>{value}</div>
            <div className="collapse-content text-sm">
                {
                    options.length > 0 &&
                    <ul>
                        {
                            options.map((obj) => {
                                return (
                                    <li className='px-3 py-2 hover:text-violet-700' key={obj._id} onClick={()=>onNavigate(obj._id,obj.title)}>{obj.title}</li>
                                )
                            })
                        }
                    </ul>
                }
            </div>
        </div>
    )
}

export default CollapseNav