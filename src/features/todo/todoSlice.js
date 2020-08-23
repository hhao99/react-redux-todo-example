import { createSlice } from '@reduxjs/toolkit';

let nextTodoId = 0

const todoSlice = createSlice({
    name: 'todos',
    initialState: [],
    reducers: {
        addTodo: {
            prepare(task) {
                return { payload: { id: nextTodoId++, task , completed: false} }
            },
            reducer(state, action) {
                const { id, task } = action.payload
                if(!task.trim()) return
                state.push({id, task, completed: false})
            },
        },
        toggleTodo(state,action) {
            const todo = state.find( todo => todo.id === action.payload)
            if(todo) todo.completed = !todo.completed
        },
        deleteTodo(state,action) {
            const todo = state.find( todo => todo.id === action.payload)
            console.log(todo)
            if(todo) state.splice(todo)
        }

    }
})

export const { addTodo, toggleTodo, deleteTodo } = todoSlice.actions
export const selectTodos = state => state.todos
export default todoSlice.reducer