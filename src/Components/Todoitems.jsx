import React from 'react'
import tick from '../assets/tick.png'
import delete_icon from '../assets/delete.png'
import not_tick from '../assets/not_tick.png'

const Todoitems = ({text , id , isComplete , deleteTodo , toggle}) => {
  return (
    <div className='flex items-center my-3 gap-2'>

      <div className='flex flex-1 items-center cursor-pointer '>

        <img src={isComplete? tick:not_tick} onClick={()=> {toggle(id)}} className='w-6'/>
        <p className={`text-slate-700 ml-3 text-lg font-semibold w-[388px] min-w-[150px] ${isComplete? 'line-through md:decoration-2':''}`} onClick={()=>{toggle(id)}}>{text} </p>

      </div>


        <img src={delete_icon} onClick={ () =>{deleteTodo(id)} } className='w-4 mr-2 inline-block cursor-pointer '/>

    </div>
  )
}

export default Todoitems
