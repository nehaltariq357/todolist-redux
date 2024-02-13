import React, { useState } from "react";
import { configureStore, createSlice } from "@reduxjs/toolkit";
import { Provider, useSelector, useDispatch } from "react-redux";


const todoSlice = createSlice({
  name: "todos",
  initialState: { todos: [] },
  reducers: {
    addTodo: (state, action) => {
      state.todos.push(action.payload);
    },
    deleteTodo: (state, action) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    },
    updateTodo: (state, action) => {
      const { id, text } = action.payload;
      const todoToUpdate = state.todos.find((todo) => todo.id === id);
      if (todoToUpdate) {
        todoToUpdate.text = text;
      }
    },
  },
});

const store = configureStore({
  reducer: todoSlice.reducer,
});

const { addTodo, deleteTodo, updateTodo } = todoSlice.actions;

const TodoList = () => {
  const todos = useSelector((state) => state.todos);
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState("");

  const handleAddTodo = () => {
    dispatch(
      addTodo({
        id: Date.now(),
        text: inputValue,
      })
    );
    setInputValue("");
  };

  const handleDeleteTodo = (id) => {
    dispatch(deleteTodo(id));
  };

  const handleUpdateTodo = (id, newText) => {
    dispatch(
      updateTodo({
        id,
        text: newText,
      })
    );
  };

  return (
    <div className="todo-list-container ">
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button onClick={handleAddTodo}>Add Todo</button>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <input
              type="text"
              value={todo.text}
              onChange={(e) => handleUpdateTodo(todo.id, e.target.value)}
            />
            <button onClick={() => handleDeleteTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

const TodoListApp = () => (
  <Provider store={store}>
    <div className="App">
      <h1>Todo List App</h1>
      <TodoList />
    </div>
  </Provider>
);

export default TodoListApp;
