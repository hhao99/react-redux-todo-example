import React, { useState } from 'react'

import { useSelector, useDispatch } from 'react-redux'
import { addTodo, toggleTodo, deleteTodo, selectTodos } from './todoSlice'

import './todoapp.css'


const AddTodo = () => {
    const [task, setTask] = useState('')
    const dispatch = useDispatch()

    return (
        <div>
            <form 
            onSubmit={ (e) => {
                e.preventDefault()
                if(!task.trim()) return
                dispatch(addTodo(task))
                setTask('')
            }}
            >
                <input type='text' value={task} 
                placeholder='new task'
                onChange={(e)=> setTask(e.target.value)} />
                <button type='submit'>Add</button>
            </form>
        </div>
    )
}

const Todo = ({todo}) => {
    const dispatch = useDispatch()
   
    return (
        <div className="TodoItem">
            <span  
                className={todo.completed? "line-through" : "line-none"} 
                onClick={ ()=> dispatch(toggleTodo(todo.id))}
                key={todo.id} >{todo.id} - {todo.task}</span>
            <span>
                <button onClick={ ()=> dispatch(deleteTodo(todo.id)) }>del</button>
            </span>
        </div>
    )
}
const TodoList  = ()=> {
    const todos = useSelector( selectTodos)
    console.log(todos)
    return (
        <div className="TodoList">
            {
                todos && todos.length ?
                <div>
                    {todos.map ( (todo) => <Todo todo={todo} />)}
                </div>
                : <h3>No todo now</h3>
            }
        </div>
    )
}
const TodoApp = () => {
    return (
        <div className="TodoApp">
            <h1>TodoApp</h1>
            <AddTodo />
            <TodoList />
        </div>
    )
}

export default TodoApp