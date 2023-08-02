import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    // todos: []
    todos: JSON.parse(localStorage.getItem("todos")) || []
};

const todoSlice = createSlice({
    name: "todoslice",
    initialState: initialState,
    reducers: {
        addtodos: (state, action) => {
            state.todos.push(action.payload);
            localStorage.setItem("todos", JSON.stringify(state.todos))
        },

        deleteTodo: (state, action) => {
            const newItems = state.todos.filter((items) => items.id !== action.payload);
            state.todos = newItems;
            localStorage.setItem("todos", JSON.stringify(state.todos))
        },

        updateTodo: (state, action) => {
            const { id, title } = action.payload;
            const todo = state.todos.find(item => item.id === id);
            if (todo) {
                todo.title = title;
                localStorage.setItem("todos", JSON.stringify(state.todos))
            }
        }
    },
})

export const { addtodos, deleteTodo, updateTodo } = todoSlice.actions;
export default todoSlice.reducer;
