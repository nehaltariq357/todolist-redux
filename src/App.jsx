import React from 'react';
import TodoList from './Component/TodoList';
import { Provider } from 'react-redux';
import store from './store';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <h1>Todo List App</h1>
        <TodoList />
      </div>
    </Provider>
  );
}

export default App;
