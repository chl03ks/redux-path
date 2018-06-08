import React  from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers }  from 'redux';
import registerServiceWorker from './registerServiceWorker';

import todos from './reducers/todos';
import visibilityFilter from './reducers/visibilityFilter';

import TodoList from './components/TodoList';
import AddTodo from './components/AddTodo';
import Footer from './components/Footer';

import './index.css';
const reducers = combineReducers({todos, visibilityFilter });
const store = createStore(reducers);

let nextId = 0;

const getVisiblesTodos = (todos, filter) => {
  switch (filter) {
    case 'SHOW_ALL':
      return todos;
    case 'SHOW_COMPLETED':
      return todos.filter(t => t.completed);
    case 'SHOW_ACTIVE': 
      return todos.filter(t => !t.completed);
    default:
      return todos;
  }
}

const TodoApp = ({ todos, visibilityFilter }) => (
  <div>
    <AddTodo onAddClick={text => 
      store.dispatch({ type: 'ADD_TODO', id: nextId++, text })} 
    />
    <TodoList
      todos={getVisiblesTodos(todos, visibilityFilter)}
      onTodoClick={id => {
        store.dispatch({ type: 'TOOGLE_TODO', id })
      }}
      />
    <Footer 
      visibilityFilter={visibilityFilter}
      onFilterClick={(filter) => store.dispatch({ type:  'SET_VISIBILITY_FILTER', filter})}
      />
  </div>
);

const render = () => {
  ReactDOM.render(
    <TodoApp {...store.getState()} />, 
    document.getElementById('root')
  );
}

store.subscribe(render);

render();

registerServiceWorker();
