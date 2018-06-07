import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { createStore }  from 'redux';
import registerServiceWorker from './registerServiceWorker';

import './index.css';

import todos from './reducers/todos';

const store = createStore(todos);

let nextId = 0;

export default class App extends Component {
  render() {
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
        }}> Add Todo </button>
        <ul>
          {this.props.todos.map((t) => 
            (
              <li key={t.id}
                  onClick={() => {
                    store.dispatch({ type: 'TOOGLE_TODO', id: t.id })}
                  } 
                  style={{ 
                    textDecoration: t.completed ? 'line-through' : 'none'
                  }}> 
                {t.text}
              </li>
            )
          )}
        </ul>
      </div>
    )
  }
}

const render = () => {
  ReactDOM.render(
    <App todos={store.getState()} />, 
    document.getElementById('root')
  );
}

store.subscribe(render);

render();

registerServiceWorker();