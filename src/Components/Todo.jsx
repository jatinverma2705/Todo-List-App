import React, { useEffect, useState } from 'react'
import img1 from '../assets/todo_icon.png'
import Todoitems from './Todoitems'
import { useRef } from 'react'

const Todo = () => {

    const [task,SetTask] = useState("");

    const [todoList, settodoList] = useState(localStorage.getItem("todos") ? JSON.parse(localStorage.getItem("todos")): []);

    //using reference hook 
    const inputRef = useRef();

    const clickHandler = () => {
        const inputText = inputRef.current.value.trim();

        //check - agar input field is empty then no need to execute below lines 
        if(inputText === ""){
            return null;
        }

        // creating a newtodo obj for each todo
        const newTodo = {
            id:Date.now(),
            text:inputText,
            isComplete:false
        }

        //storing objects in todoList -> using spread operator for storing prev values also.
        settodoList( (prev) => [...prev, newTodo]);
        
        //setting input field text to null
        inputRef.current.value = "";
    }

    const deleteTodo = (id) => {
        //Now we have to neglect the entry with matching id
        //Removing the entry from todolist by matching id
        settodoList((prevTodo) => {
            return prevTodo.filter((todo) => todo.id !== id)
        })
    }

    //Function for marking tick or untick the task
    const toggle = (id) => {
        settodoList((prevTodos) => {
            return prevTodos.map((todos)=>{
                //callback function for map
                if(todos.id === id){
                    //  Keeps other properties, updates 'isComplete'
                    return {...todos ,isComplete: !todos.isComplete}
                }
                return todos;
            })
        })
    }

    useEffect(()=>{
        localStorage.setItem( "todos", JSON.stringify(todoList));

    } , [todoList])



  return (
    <div className='flex flex-col bg-white  rounded-xl max-h-[680px] w-[500px] p-7 min-h-[580px] min-w-[140px]'>

     {/* title */}
        <div className='flex items-center mt-6 gap-3'>
            <img src={img1} className='w-8'/>
            <h1 className='text-3xl font-semibold'>To-Do List</h1>
        </div>

    {/* input box */}

    {/* Two way binding in input box */}
        <div className='my-7 flex items-center bg-gray-200 rounded-full  '>
            <input type="text" 
            ref={inputRef}  
            placeholder='Add new task..' 
            className='p-3 rounded-l-full w-[335px] bg-transparent text-lg 
               focus:outline-none flex-1 h-14 pl-6 pr-2 
               border border-gray-300 border-r-0 
               focus:border-sky-500 focus:ring-0 
               focus:shadow-[inset_-2px_0_5px_rgba(33,150,243,0.5),inset_0_-2px_5px_rgba(33,150,243,0.5),inset_0_2px_5px_rgba(33,150,243,0.5)] 
               shadow-sm placeholder:text-slate-600 italic'  
            onChange={(e) => {SetTask(e.target.value)}}
            
            />
            <button 
            className='bg-orange-600 border border-gray-300 border-l-0 
               rounded-r-full w-32 h-14 
               text-white text-xl font-medium ' 
            onClick={clickHandler}
           
            >ADD +</button>
        </div>

        {/* Todo items */}
        <div className=''>

            
            {/* {renderTask} */}
            {/* <Todoitems text="Git repos initial"/>
            <Todoitems text="Learn Coding"/> */}

            {todoList.map( (item , index) => {
                return <Todoitems key={index} text={item.text} id={item.id}  isComplete={item.isComplete} deleteTodo={deleteTodo} toggle={toggle}/>
            })}
        

        </div>

    </div>
  )
}

export default Todo
