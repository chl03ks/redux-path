import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

import { createStore } from 'redux';
import Counter from './componets/Counter';
import CounterReducer from './componets/CounterReducer';

const store = createStore(CounterReducer);

const render = () => {
  ReactDOM.render(
    <Counter 
      value={store.getState()}
      onIncrement={() => store.dispatch({ type: 'INCREMENT'})}
      onDecrement={() => store.dispatch({ type: 'DECREMENT'})}
    />, 
  document.getElementById('root'));
}

store.subscribe(render);

render();

registerServiceWorker();
