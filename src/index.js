import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers }  from 'redux';
import registerServiceWorker from './registerServiceWorker';

import './index.css';

import TodoList from './components/TodoList';

import todos from './reducers/todos';

import visibilityFilter from './reducers/visibilityFilter';

const reducers = combineReducers({todos, visibilityFilter });

const store = createStore(reducers);

let nextId = 0;

const FilterLink = ({filter , children, currentFilter }) => {
  if(filter === currentFilter) {
    return <span> {children} </span>
  }

  return (
    <a href="/" onClick={e => {
         e.preventDefault();
         store.dispatch({ type: 'SET_VISIBILITY_FILTER', filter })
       }}>
       { children }
    </a>
  );
}

class App extends Component {

  getVisiblesTodos(todos, filter) {
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

  render() {
    const { todos, visibilityFilter } = this.props;
    const visibleTodos = this.getVisiblesTodos(
      todos,
      visibilityFilter,
    );

    return (
      <div>
        <input ref={node => {this.input = node}} />
        <button onClick={() => {
          store.dispatch({
            type: 'ADD_TODO',
            text: this.input.value,
            id: nextId++
          });
          this.input.value = '';
        }}> Add Todo  </button>
        <TodoList
          todos={visibleTodos}
          onTodoClick={id => {
            store.dispatch({ type: 'TOOGLE_TODO', id })
          }}
         />
        <p>
          Show: 
          <FilterLink 
            filter='SHOW_ALL'
            currentFilter={visibilityFilter}>
            All
          </FilterLink>
          { '  ' }
          <FilterLink 
            filter='SHOW_ACTIVE' 
            currentFilter={visibilityFilter}>
            Active
          </FilterLink>
          { '  ' }
          <FilterLink 
            filter='SHOW_COMPLETED' 
            currentFilter={visibilityFilter}>
            Completed
          </FilterLink>
          { '  ' }
        </p>
      </div>
    )
  }
}

const render = () => {
  ReactDOM.render(
    <App {...store.getState()} />, 
    document.getElementById('root')
  );
}

store.subscribe(render);

render();

registerServiceWorker();
